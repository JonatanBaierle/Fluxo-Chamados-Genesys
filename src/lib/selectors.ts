/* =========================================================================
   Leituras derivadas do BoardSnapshot.

   Ficavam em mock-data.ts na Etapa 1. Foram movidas para ca porque nao sao
   dados de exemplo: sao regras de ordenacao e posicionamento que continuam
   valendo depois que o mock for substituido pelo Postgres (Etapa 6).
   ========================================================================= */

import type { BoardSnapshot, Column, Task } from "./types";

/** Colunas do quadro, ja na ordem de exibicao (esquerda para a direita). */
export function orderedColumns(snapshot: BoardSnapshot): Column[] {
  return [...snapshot.columns].sort((a, b) => a.position - b.position);
}

/** Tarefas de uma coluna, ja na ordem de exibicao (de cima para baixo). */
export function tasksOfColumn(snapshot: BoardSnapshot, columnId: string): Task[] {
  return snapshot.tasks
    .filter((task) => task.columnId === columnId)
    .sort((a, b) => a.position - b.position);
}

/**
 * Posicao de uma tarefa nova: sempre o fim da coluna.
 * Posicoes comecam em 1, como no mock e como nas futuras linhas do banco.
 */
export function nextPositionIn(tasks: Task[], columnId: string): number {
  const positions = tasks
    .filter((task) => task.columnId === columnId)
    .map((task) => task.position);

  return positions.length === 0 ? 1 : Math.max(...positions) + 1;
}

/**
 * Renumera uma coluna para 1, 2, 3... sem buracos.
 *
 * Chamada depois de uma exclusao. Sem isso as posicoes sobreviventes ficariam
 * com lacunas (1, 3, 4) e a reordenacao por arraste da Etapa 3 teria que
 * lidar com esse caso. Manter a sequencia limpa agora evita esse trabalho.
 */
export function resequenceColumn(tasks: Task[], columnId: string): Task[] {
  const ordered = tasks
    .filter((task) => task.columnId === columnId)
    .sort((a, b) => a.position - b.position);

  const newPosition = new Map(
    ordered.map((task, index) => [task.id, index + 1] as const),
  );

  return tasks.map((task) => {
    const position = newPosition.get(task.id);
    return position === undefined || position === task.position
      ? task
      : { ...task, position };
  });
}
