import { formatFullDateTime, formatShortDate } from "@/lib/format";
import type { Task } from "@/lib/types";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
}

/**
 * Card de tarefa.
 *
 * Na Etapa 1 e apenas visual: abrir o modal de edicao entra na Etapa 2 e o
 * arraste entra na Etapa 3. O elemento ja e um <article> com foco navegavel
 * para que essas interacoes sejam ligadas sem mexer na marcacao.
 */
export default function TaskCard({ task }: TaskCardProps) {
  return (
    <article className={styles.card} tabIndex={0}>
      <h3 className={styles.title}>{task.title}</h3>

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
