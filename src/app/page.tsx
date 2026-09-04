import Board from "@/components/Board/Board";
import Header from "@/components/Header/Header";
import { BoardProvider } from "@/lib/board-store";
import { mockBoard } from "@/lib/mock-data";
import styles from "./page.module.css";

/**
 * Pagina publica (item 1).
 *
 * Continua sendo um Server Component: quem carrega os dados e o servidor.
 * O BoardProvider e a fronteira onde o snapshot passa a ser interativo, e na
 * Etapa 6 basta trocar `mockBoard` por uma consulta ao Postgres.
 */
export default function PublicBoardPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <BoardProvider initialSnapshot={mockBoard}>
          <Board viewer="public" />
        </BoardProvider>
      </main>
    </div>
  );
}
