"use client";

import { useEffect, useId, useRef, useState } from "react";

import Modal from "@/components/Modal/Modal";
import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  validateTaskDraft,
  type TaskDraft,
  type TaskDraftErrors,
} from "@/lib/validation";
import styles from "./TaskModal.module.css";

export type TaskModalMode = "create" | "edit";

interface TaskModalProps {
  open: boolean;
  mode: TaskModalMode;
  /** Nome da coluna, exibido como contexto no subtitulo. */
  columnTitle: string;
  /** Valores iniciais. Vazios quando o modo e "create". */
  initialDraft: TaskDraft;
  onCancel: () => void;
  onSubmit: (draft: TaskDraft) => void;
}

const EMPTY_ERRORS: TaskDraftErrors = {};

/**
 * Modal de criacao e edicao de tarefa (item 3).
 *
 * Os dois modos compartilham o mesmo formulario porque os campos sao os
 * mesmos; muda apenas o texto do cabecalho e do botao de confirmacao.
 *
 * A exclusao nao mora aqui de proposito: a especificacao descreve o modal
 * com Titulo, Descricao e os botoes Cancelar/Salvar. Excluir e uma acao do
 * card, com confirmacao propria.
 */
export default function TaskModal({
  open,
  mode,
  columnTitle,
  initialDraft,
  onCancel,
  onSubmit,
}: TaskModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const headingId = useId();
  const titleErrorId = `${titleId}-erro`;
  const descriptionErrorId = `${descriptionId}-erro`;

  const [draft, setDraft] = useState<TaskDraft>(initialDraft);
  const [errors, setErrors] = useState<TaskDraftErrors>(EMPTY_ERRORS);
  const titleRef = useRef<HTMLInputElement>(null);

  // Cada abertura recomeca do zero: sem isso, o modal reabriria com o texto
  // da tarefa anterior.
  useEffect(() => {
    if (!open) return;

    setDraft(initialDraft);
    setErrors(EMPTY_ERRORS);

    // O foco vai para o primeiro campo assim que o dialogo aparece.
    const frame = requestAnimationFrame(() => titleRef.current?.focus());
    return () => cancelAnimationFrame(frame);
    // initialDraft e recriado a cada render do pai; comparar por conteudo
    // evitaria o reset. Depender so de `open` e suficiente e mais previsivel.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateTaskDraft(draft);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      if (found.title) titleRef.current?.focus();
      return;
    }

    onSubmit(draft);
  }

  const isCreate = mode === "create";
  const titleLength = draft.title.trim().length;
  const descriptionLength = draft.description.trim().length;

  return (
    <Modal open={open} onClose={onCancel} labelledBy={headingId}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <header className={styles.header}>
          <h2 className={styles.heading} id={headingId}>
            {isCreate ? "Nova tarefa" : "Editar tarefa"}
          </h2>
          <p className={styles.subheading}>
            Coluna <strong className={styles.columnName}>{columnTitle}</strong>
          </p>
        </header>

        <div className={styles.body}>
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor={titleId}>
                Titulo
              </label>
              <span className={styles.counter} aria-hidden="true">
                {titleLength}/{TASK_TITLE_MAX_LENGTH}
              </span>
            </div>
            <input
              ref={titleRef}
              id={titleId}
              className={styles.input}
              type="text"
              value={draft.title}
              maxLength={TASK_TITLE_MAX_LENGTH}
              placeholder="Resuma a solicitacao em uma linha"
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={errors.title ? titleErrorId : undefined}
              onChange={(event) => {
                setDraft((current) => ({
                  ...current,
                  title: event.target.value,
                }));
                if (errors.title) {
                  setErrors((current) => ({ ...current, title: undefined }));
                }
              }}
            />
            {errors.title && (
              <p className={styles.error} id={titleErrorId} role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor={descriptionId}>
                Descricao
                <span className={styles.optional}>opcional</span>
              </label>
              <span className={styles.counter} aria-hidden="true">
                {descriptionLength}/{TASK_DESCRIPTION_MAX_LENGTH}
              </span>
            </div>
            <textarea
              id={descriptionId}
              className={`${styles.input} ${styles.textarea} scroll-area`}
              value={draft.description}
              rows={5}
              maxLength={TASK_DESCRIPTION_MAX_LENGTH}
              placeholder="Detalhe o que precisa ser feito, criterios de aceite, prazos"
              aria-invalid={errors.description ? true : undefined}
              aria-describedby={
                errors.description ? descriptionErrorId : undefined
              }
              onChange={(event) => {
                setDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }));
                if (errors.description) {
                  setErrors((current) => ({
                    ...current,
                    description: undefined,
                  }));
                }
              }}
            />
            {errors.description && (
              <p className={styles.error} id={descriptionErrorId} role="alert">
                {errors.description}
              </p>
            )}
          </div>
        </div>

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.primaryButton}>
            {isCreate ? "Criar tarefa" : "Salvar"}
          </button>
        </footer>
      </form>
    </Modal>
  );
}
