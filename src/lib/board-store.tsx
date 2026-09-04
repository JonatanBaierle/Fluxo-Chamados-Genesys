"use client";

/* =========================================================================
   Estado do quadro no navegador.

   Um unico reducer concentra todas as mudancas de tarefa. A interface nunca
   altera o snapshot diretamente: ela despacha uma intencao ("criar",
   "editar", "excluir") e recebe o proximo snapshot pronto.

   Por que isso importa para as proximas etapas:
   - Etapa 3 (arraste) acrescenta uma acao "task/moved" ao mesmo reducer,
     sem mexer nos componentes que ja existem.
   - Etapa 6 (banco) transforma cada funcao abaixo em uma chamada ao /api
     correspondente. O reducer continua sendo quem aplica o resultado na
     tela, entao os componentes tambem nao mudam la.

   Atencao: nesta etapa o estado vive apenas na memoria da aba. Recarregar a
   pagina volta aos dados de exemplo — a persistencia e o assunto da Etapa 6
   (item 12), e localStorage foi descartado como solucao definitiva.
   ========================================================================= */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { nextPositionIn, resequenceColumn } from "./selectors";
import type { BoardSnapshot, Task } from "./types";
import { normalizeTaskDraft, type TaskDraft } from "./validation";

/* ---- Acoes ---------------------------------------------------------------- */

type BoardAction =
  | { type: "task/created"; task: Task }
  | { type: "task/updated"; id: string; draft: TaskDraft; timestamp: string }
  | { type: "task/deleted"; id: string };

/* ---- Reducer -------------------------------------------------------------- */

function boardReducer(state: BoardSnapshot, action: BoardAction): BoardSnapshot {
  switch (action.type) {
    case "task/created":
      return { ...state, tasks: [...state.tasks, action.task] };

    case "task/updated": {
      const target = state.tasks.find((task) => task.id === action.id);
      if (!target) return state;

      // Sem mudanca real, nao mexe na data de ultima alteracao (item 3).
      const unchanged =
        target.title === action.draft.title &&
        target.description === action.draft.description;
      if (unchanged) return state;

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? {
                ...task,
                title: action.draft.title,
                description: action.draft.description,
                updatedAt: action.timestamp,
              }
            : task,
        ),
      };
    }

    case "task/deleted": {
      const target = state.tasks.find((task) => task.id === action.id);
      if (!target) return state;

      const remaining = state.tasks.filter((task) => task.id !== action.id);
      return { ...state, tasks: resequenceColumn(remaining, target.columnId) };
    }

    default:
      return state;
  }
}

/* ---- Geracao de identificador --------------------------------------------- */

/**
 * Id temporario, gerado no navegador apenas enquanto nao existe banco.
 * Na Etapa 6 quem gera o id e o Postgres, e esta funcao desaparece.
 */
function generateTaskId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `task-${crypto.randomUUID()}`;
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/* ---- Contexto ------------------------------------------------------------- */

interface BoardStore {
  snapshot: BoardSnapshot;
  /** Cria uma tarefa no fim da coluna informada e devolve a tarefa criada. */
  createTask: (columnId: string, draft: TaskDraft) => Task;
  updateTask: (taskId: string, draft: TaskDraft) => void;
  deleteTask: (taskId: string) => void;
}

const BoardContext = createContext<BoardStore | null>(null);

interface BoardProviderProps {
  /** Snapshot renderizado pelo servidor. Vira consulta SQL na Etapa 6. */
  initialSnapshot: BoardSnapshot;
  children: ReactNode;
}

export function BoardProvider({
  initialSnapshot,
  children,
}: BoardProviderProps) {
  const [snapshot, dispatch] = useReducer(boardReducer, initialSnapshot);

  const createTask = useCallback(
    (columnId: string, draft: TaskDraft): Task => {
      const normalized = normalizeTaskDraft(draft);
      const timestamp = new Date().toISOString();

      const task: Task = {
        id: generateTaskId(),
        boardId: initialSnapshot.board.id,
        columnId,
        title: normalized.title,
        description: normalized.description,
        position: nextPositionIn(snapshot.tasks, columnId),
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      dispatch({ type: "task/created", task });
      return task;
    },
    [initialSnapshot.board.id, snapshot.tasks],
  );

  const updateTask = useCallback((taskId: string, draft: TaskDraft) => {
    dispatch({
      type: "task/updated",
      id: taskId,
      draft: normalizeTaskDraft(draft),
      timestamp: new Date().toISOString(),
    });
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    dispatch({ type: "task/deleted", id: taskId });
  }, []);

  const value = useMemo<BoardStore>(
    () => ({ snapshot, createTask, updateTask, deleteTask }),
    [snapshot, createTask, updateTask, deleteTask],
  );

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

export function useBoard(): BoardStore {
  const store = useContext(BoardContext);
  if (!store) {
    throw new Error("useBoard precisa estar dentro de <BoardProvider>.");
  }
  return store;
}
