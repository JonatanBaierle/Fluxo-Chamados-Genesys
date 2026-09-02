/* =========================================================================
   Dados de exemplo da Etapa 1.
   Servem apenas para desenhar e validar a interface. Na Etapa 6 este arquivo
   e substituido por consultas ao Postgres, sem alterar os componentes:
   ambos entregam o mesmo BoardSnapshot.
   ========================================================================= */

import type { BoardSnapshot } from "./types";

const BOARD_ID = "board-genesys";

export const mockBoard: BoardSnapshot = {
  board: {
    id: BOARD_ID,
    title: "Fluxo de Chamados Genesys",
    description:
      "Acompanhamento das solicitacoes abertas para a plataforma Genesys.",
  },

  columns: [
    {
      id: "col-a-fazer",
      boardId: BOARD_ID,
      title: "A fazer",
      position: 1,
      accent: "magenta",
      permissions: {
        createTask: true,
        editTask: true,
        deleteTask: true,
        moveTaskOut: true,
        receiveTask: true,
      },
    },
    {
      id: "col-analise",
      boardId: BOARD_ID,
      title: "Analise",
      position: 2,
      accent: "orange",
      permissions: {
        createTask: true,
        editTask: true,
        deleteTask: false,
        moveTaskOut: true,
        receiveTask: true,
      },
    },
    {
      id: "col-desenvolvimento",
      boardId: BOARD_ID,
      title: "Desenvolvimento",
      position: 3,
      accent: "crimson",
      permissions: {
        createTask: false,
        editTask: true,
        deleteTask: false,
        moveTaskOut: true,
        receiveTask: true,
      },
    },
    {
      id: "col-testes",
      boardId: BOARD_ID,
      title: "Testes",
      position: 4,
      accent: "pink",
      permissions: {
        createTask: false,
        editTask: true,
        deleteTask: false,
        moveTaskOut: true,
        receiveTask: true,
      },
    },
    {
      id: "col-finalizado",
      boardId: BOARD_ID,
      title: "Finalizado",
      position: 5,
      accent: "wine",
      permissions: {
        createTask: false,
        editTask: false,
        deleteTask: false,
        moveTaskOut: false,
        receiveTask: true,
      },
    },
  ],

  tasks: [
    {
      id: "task-01",
      boardId: BOARD_ID,
      columnId: "col-a-fazer",
      title: "Criar fila de atendimento para o time de retencao",
      description:
        "Solicitacao para abrir uma nova fila com transbordo apos 45 segundos e horario comercial estendido.",
      position: 1,
      createdAt: "2026-08-24T12:10:00.000Z",
      updatedAt: "2026-08-28T17:42:00.000Z",
    },
    {
      id: "task-02",
      boardId: BOARD_ID,
      columnId: "col-a-fazer",
      title: "Revisar perfis de acesso do supervisor",
      description:
        "Conferir quais permissoes o perfil de supervisor precisa manter apos a revisao de licencas.",
      position: 2,
      createdAt: "2026-08-25T13:05:00.000Z",
      updatedAt: "2026-08-25T13:05:00.000Z",
    },
    {
      id: "task-03",
      boardId: BOARD_ID,
      columnId: "col-a-fazer",
      title: "Atualizar mensagem de espera da URA",
      description:
        "Trocar o audio institucional e revisar o texto lido antes do menu principal.",
      position: 3,
      createdAt: "2026-08-26T09:30:00.000Z",
      updatedAt: "2026-08-27T11:20:00.000Z",
    },
    {
      id: "task-04",
      boardId: BOARD_ID,
      columnId: "col-analise",
      title: "Levantar volume de chamadas por celula",
      description:
        "Extrair o historico dos ultimos seis meses para dimensionar o novo roteamento.",
      position: 1,
      createdAt: "2026-08-20T14:00:00.000Z",
      updatedAt: "2026-08-29T18:15:00.000Z",
    },
    {
      id: "task-05",
      boardId: BOARD_ID,
      columnId: "col-analise",
      title: "Mapear integracao com o CRM",
      description:
        "Documentar os campos enviados na abertura do chamado e validar os obrigatorios.",
      position: 2,
      createdAt: "2026-08-21T16:45:00.000Z",
      updatedAt: "2026-08-21T16:45:00.000Z",
    },
    {
      id: "task-06",
      boardId: BOARD_ID,
      columnId: "col-desenvolvimento",
      title: "Configurar roteamento por habilidade",
      description:
        "Aplicar as regras de skill definidas na analise e ajustar os pesos por nivel de proficiencia.",
      position: 1,
      createdAt: "2026-08-18T11:00:00.000Z",
      updatedAt: "2026-09-01T13:30:00.000Z",
    },
    {
      id: "task-07",
      boardId: BOARD_ID,
      columnId: "col-desenvolvimento",
      title: "Ajustar script de pesquisa de satisfacao",
      description:
        "Reduzir a pesquisa para tres perguntas e registrar o resultado junto ao protocolo.",
      position: 2,
      createdAt: "2026-08-19T10:20:00.000Z",
      updatedAt: "2026-08-31T09:05:00.000Z",
    },
    {
      id: "task-08",
      boardId: BOARD_ID,
      columnId: "col-desenvolvimento",
      title: "Criar painel de acompanhamento em tempo real",
      description:
        "Montar a visao de fila, TMA e nivel de servico para o time de monitoria.",
      position: 3,
      createdAt: "2026-08-22T15:40:00.000Z",
      updatedAt: "2026-08-30T20:10:00.000Z",
    },
    {
      id: "task-09",
      boardId: BOARD_ID,
      columnId: "col-testes",
      title: "Validar transbordo entre filas",
      description:
        "Simular picos de volume e confirmar que o transbordo respeita a ordem definida.",
      position: 1,
      createdAt: "2026-08-15T08:25:00.000Z",
      updatedAt: "2026-09-01T19:00:00.000Z",
    },
    {
      id: "task-10",
      boardId: BOARD_ID,
      columnId: "col-testes",
      title: "Testar gravacao de chamadas",
      description:
        "Verificar se a gravacao esta vinculada ao protocolo correto e disponivel na busca.",
      position: 2,
      createdAt: "2026-08-16T17:10:00.000Z",
      updatedAt: "2026-08-28T14:35:00.000Z",
    },
    {
      id: "task-11",
      boardId: BOARD_ID,
      columnId: "col-finalizado",
      title: "Migrar usuarios inativos para o perfil basico",
      description:
        "Concluida a reclassificacao dos usuarios sem acesso nos ultimos noventa dias.",
      position: 1,
      createdAt: "2026-08-05T12:00:00.000Z",
      updatedAt: "2026-08-27T10:45:00.000Z",
    },
    {
      id: "task-12",
      boardId: BOARD_ID,
      columnId: "col-finalizado",
      title: "Padronizar nomenclatura das filas",
      description:
        "Todas as filas seguem agora o padrao CELULA_CANAL_TURNO definido com a operacao.",
      position: 2,
      createdAt: "2026-08-06T09:15:00.000Z",
      updatedAt: "2026-08-25T16:20:00.000Z",
    },
  ],
};

/** Tarefas de uma coluna, ja na ordem de exibicao. */
export function tasksOfColumn(snapshot: BoardSnapshot, columnId: string) {
  return snapshot.tasks
    .filter((task) => task.columnId === columnId)
    .sort((a, b) => a.position - b.position);
}

/** Colunas do quadro, ja na ordem de exibicao. */
export function orderedColumns(snapshot: BoardSnapshot) {
  return [...snapshot.columns].sort((a, b) => a.position - b.position);
}
