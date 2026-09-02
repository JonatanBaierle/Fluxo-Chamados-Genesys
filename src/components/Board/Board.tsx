import Column from "@/components/Column/Column";
import { orderedColumns, tasksOfColumn } from "@/lib/mock-data";
import type { BoardSnapshot, Viewer } from "@/lib/types";
import styles from "./Board.module.css";

interface BoardProps {
  snapshot: BoardSnapshot;
  viewer: Viewer;
}

/** Quadro completo: titulo, resumo e a faixa de colunas. */
export default function Board({ snapshot, viewer }: BoardProps) {
  const columns = orderedColumns(snapshot);

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
          />
        ))}
      </div>
    </div>
  );
}
