/* =========================================================================
   Regras de validacao de tarefa.

   Este arquivo nao importa nada do React de proposito: as mesmas funcoes
   rodam no formulario (feedback imediato) e vao rodar de novo na rota de API
   da Etapa 6. O item 13 exige que o servidor nao confie no frontend, entao a
   validacao do navegador e conveniencia, nao garantia.
   ========================================================================= */

export const TASK_TITLE_MAX_LENGTH = 120;
export const TASK_DESCRIPTION_MAX_LENGTH = 1000;

/** O que o usuario digita no modal. */
export interface TaskDraft {
  title: string;
  description: string;
}

export type TaskDraftErrors = Partial<Record<keyof TaskDraft, string>>;

/** Remove espacos das pontas e normaliza quebras de linha. */
export function normalizeTaskDraft(draft: TaskDraft): TaskDraft {
  return {
    title: draft.title.trim().replace(/\s+/g, " "),
    description: draft.description.trim().replace(/\r\n/g, "\n"),
  };
}

/** Objeto vazio significa rascunho valido. */
export function validateTaskDraft(draft: TaskDraft): TaskDraftErrors {
  const normalized = normalizeTaskDraft(draft);
  const errors: TaskDraftErrors = {};

  if (normalized.title.length === 0) {
    errors.title = "Informe um titulo para a tarefa.";
  } else if (normalized.title.length > TASK_TITLE_MAX_LENGTH) {
    errors.title = `O titulo deve ter no maximo ${TASK_TITLE_MAX_LENGTH} caracteres.`;
  }

  if (normalized.description.length > TASK_DESCRIPTION_MAX_LENGTH) {
    errors.description = `A descricao deve ter no maximo ${TASK_DESCRIPTION_MAX_LENGTH} caracteres.`;
  }

  return errors;
}

export function isValidTaskDraft(draft: TaskDraft): boolean {
  return Object.keys(validateTaskDraft(draft)).length === 0;
}
