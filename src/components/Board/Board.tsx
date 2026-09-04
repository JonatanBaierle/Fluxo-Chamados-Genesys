"use client";

import { useState } from "react";

import Column from "@/components/Column/Column";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import TaskModal from "@/components/TaskModal/TaskModal";
import { useBoard } from "@/lib/board-store";
import { orderedColumns, tasksOfColumn } from "@/lib/selectors";
import type { Task, Viewer } from "@/lib/types";
import type { TaskDraft } from "@/lib/validation";
import styles from "./Board.module.css";

/** Qual dialogo esta aberto. `null` significa nenhum. */
type Editor =
  | { mode: "create"; columnId: string }
  | { mode: "edit"; task: Task };

interface BoardProps {
  viewer: Viewer;
}

const EMPTY_DRAFT: TaskDraft = { title: "", description: "" };

/**
 * Quadro completo: titulo, resumo e a faixa de colunas.
 *
 * O estado dos dialogos vive aqui, e nao dentro de cada card, por dois
 * motivos: existe no maximo um modal aberto por vez, e um dialogo renderizado
 * na raiz do quadro nao sofre com a rolagem nem com o recorte das colunas.
 * Colunas e cards apenas avisam a intencao atraves de callbacks.
 */
export default function Board({ viewer }: BoardProps) {
  const { snapshot, createTask, updateTask, deleteTask } = useBoard();

  const [editor, setEditor] = useState<Editor | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [status, setStatus] = useState("");

  const columns = orderedColumns(snapshot);

  function columnTitleOf(columnId: string): string {
    return (
      snapshot.columns.find((column) => column.id === columnId)?.title ?? ""
    );
  }

  function handleSubmit(draft: TaskDraft) {
    if (!editor) return;

    if (editor.mode === "create") {
      createTask(editor.columnId, draft);
      setStatus(`Tarefa criada na coluna ${columnTitleOf(editor.columnId)}.`);
    } else {
      updateTask(editor.task.id, draft);
      setStatus("Tarefa atualizada.");
    }

    setEditor(null);
  }

  function handleConfirmDelete() {
    if (!taskToDelete) return;

    deleteTask(taskToDelete.id);
    setStatus(`Tarefa ${taskToDelete.title} excluida.`);
    setTaskToDelete(null);
  }

  return (
    <div className={styles.board}>
      <div className={styles.intro}>
        <div className={styles.introText}>
          <h1 className={styles.boardTitle}>{snapshot.board.title}</h1>
          <p className={styles.boardDescription}>
            {snapshot.board.description}
          </p>
        </div>

        <dl className={styles.summary}>
          <div className={styles.summaryItem}>
            <dt className={styles.summaryLabel}>Colunas</dt>
            <dd className={styles.summaryValue}>{columns.length}</dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summaryLabel}>Tarefas</dt>
            <dd className={styles.summaryValue}>{snapshot.tasks.length}</dd>
          </div>
        </dl>
      </div>

      <div className={`${styles.columns} scroll-area`}>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasksOfColumn(snapshot, column.id)}
            viewer={viewer}
            onCreateTask={() =>
              setEditor({ mode: "create", columnId: column.id })
            }
            onEditTask={(task) => setEditor({ mode: "edit", task })}
            onDeleteTask={(task) => setTaskToDelete(task)}
          />
        ))}
      </div>

      {/* Confirmacao lida por leitores de tela, sem roubar o foco. */}
      <p className="visually-hidden" role="status" aria-live="polite">
        {status}
      </p>

      {editor && (
        <TaskModal
          open
          mode={editor.mode}
          columnTitle={
            editor.mode === "create"
              ? columnTitleOf(editor.columnId)
              : columnTitleOf(editor.task.columnId)
          }
          initialDraft={
            editor.mode === "create"
              ? EMPTY_DRAFT
              : {
                  title: editor.task.title,
                  description: editor.task.description,
                }
          }
          onCancel={() => setEditor(null)}
          onSubmit={handleSubmit}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          open
          heading="Excluir tarefa"
          message={
            <>
              A tarefa <strong>{taskToDelete.title}</strong> sera removida do
              quadro. Esta acao nao pode ser desfeita.
            </>
          }
          confirmLabel="Excluir tarefa"
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}
