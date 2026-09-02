/* =========================================================================
   Modelo de dados do Kanban.
   Os nomes e formatos aqui ja antecipam as tabelas do Postgres (Etapa 6),
   para que a migracao de dados mock -> banco nao exija reescrever a UI.
   ========================================================================= */

/** Acoes que o administrador pode liberar ou bloquear por coluna (item 4). */
export interface ColumnPermissions {
  /** Usuario publico pode criar tarefas nesta coluna. */
  createTask: boolean;
  /** Usuario publico pode editar tarefas desta coluna. */
  editTask: boolean;
  /** Usuario publico pode excluir tarefas desta coluna. */
  deleteTask: boolean;
  /** Usuario publico pode retirar tarefas desta coluna. */
  moveTaskOut: boolean;
  /** Usuario publico pode trazer tarefas de outra coluna para esta. */
  receiveTask: boolean;
}

/**
 * Cor de identificacao visual da coluna (item 8).
 * String fechada em vez de hexadecimal livre: garante que apenas cores da
 * paleta oficial cheguem na interface, inclusive quando o valor vier do banco.
 */
export type ColumnAccent =
  | "magenta"
  | "crimson"
  | "wine"
  | "pink"
  | "pinkLight"
  | "orange";

export interface Column {
  id: string;
  boardId: string;
  title: string;
  /** Posicao da coluna no quadro, crescente da esquerda para a direita. */
  position: number;
  accent: ColumnAccent;
  permissions: ColumnPermissions;
}

export interface Task {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  /** Posicao da tarefa dentro da coluna, crescente de cima para baixo. */
  position: number;
  /** ISO 8601 em UTC. */
  createdAt: string;
  /** ISO 8601 em UTC. */
  updatedAt: string;
}

export interface Board {
  id: string;
  title: string;
  description: string;
}

/** Formato unico que a pagina publica consome. */
export interface BoardSnapshot {
  board: Board;
  columns: Column[];
  tasks: Task[];
}

/** Quem esta olhando o quadro. Usado para decidir o que a interface mostra. */
export type Viewer = "public" | "admin";
