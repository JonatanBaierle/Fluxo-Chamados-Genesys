import { formatFullDateTime, formatShortDate } from "@/lib/format";
import type { Task } from "@/lib/types";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  canEdit: boolean;
  canDelete: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Card de tarefa.
 *
 * Quando ha permissao de edicao, o card inteiro abre o modal. Isso e feito
 * com um unico <button> no titulo cujo ::after cobre o card: a area clicavel
 * fica grande sem aninhar botao dentro de botao, e o teclado continua com um
 * so ponto de parada por acao.
 *
 * O arraste entra na Etapa 3 e vai usar este mesmo <article> como alvo.
 */
export default function TaskCard({
  task,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const showActions = canEdit || canDelete;

  return (
    <article className={styles.card} data-interactive={canEdit || undefined}>
      {showActions && (
        <div className={styles.actions}>
          {canEdit && (
            <button
              type="button"
              className={styles.actionButton}
              onClick={onEdit}
              title="Editar tarefa"
              aria-label={`Editar a tarefa ${task.title}`}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M11.1 2.6a1.4 1.4 0 0 1 2 2l-6.6 6.6-2.6.6.6-2.6 6.6-6.6Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.8 13.6h10.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}

          {canDelete && (
            <button
              type="button"
              className={`${styles.actionButton} ${styles.danger}`}
              onClick={onDelete}
              title="Excluir tarefa"
              aria-label={`Excluir a tarefa ${task.title}`}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M3.4 4.6h9.2M6.6 4.6V3.4h2.8v1.2M4.6 4.6l.5 8h5.8l.5-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.9 6.9v3.6M9.1 6.9v3.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      <h3 className={styles.title}>
        {canEdit ? (
          <button type="button" className={styles.titleButton} onClick={onEdit}>
            {task.title}
          </button>
        ) : (
          task.title
        )}
      </h3>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <footer className={styles.footer}>
        <span
          className={styles.meta}
          title={`Ultima alteracao em ${formatFullDateTime(task.updatedAt)}`}
        >
          <svg className={styles.metaIcon} viewBox="0 0 16 16" aria-hidden="true">
            <circle
              cx="8"
              cy="8"
              r="5.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M8 4.8V8l2.1 1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {formatShortDate(task.updatedAt)}
        </span>
      </footer>
    </article>
  );
}
