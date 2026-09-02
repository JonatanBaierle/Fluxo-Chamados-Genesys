import TaskCard from "@/components/TaskCard/TaskCard";
import { can } from "@/lib/permissions";
import type { Column as ColumnModel, Task, Viewer } from "@/lib/types";
import styles from "./Column.module.css";

interface ColumnProps {
  column: ColumnModel;
  tasks: Task[];
  viewer: Viewer;
}

/** Uma coluna do quadro, com cabecalho, lista de tarefas e acao de criar. */
export default function Column({ column, tasks, viewer }: ColumnProps) {
  const canCreate = can(viewer, column, "createTask");

  return (
    <section
      className={styles.column}
      data-accent={column.accent}
      aria-label={`Coluna ${column.title}`}
    >
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.header}>
        <h2 className={styles.title}>{column.title}</h2>
        <span className={styles.count} aria-label={`${tasks.length} tarefas`}>
          {tasks.length}
        </span>
      </header>

      <div className={`${styles.list} scroll-area`}>
        {tasks.length === 0 ? (
          <p className={styles.empty}>Nenhuma tarefa nesta coluna.</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>

      {/* Item 4: acao indisponivel para o usuario nao e exibida. */}
      {canCreate && (
        <button type="button" className={styles.createButton}>
          <span className={styles.createIcon} aria-hidden="true">
            +
          </span>
          Criar tarefa
        </button>
      )}
    </section>
  );
}
