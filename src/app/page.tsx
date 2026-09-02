import Board from "@/components/Board/Board";
import Header from "@/components/Header/Header";
import { mockBoard } from "@/lib/mock-data";
import styles from "./page.module.css";

/**
 * Pagina publica (item 1).
 * Acesso livre, sem login. Na Etapa 6 o mockBoard e trocado por uma leitura
 * do Postgres; o restante da pagina permanece igual.
 */
export default function PublicBoardPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Board snapshot={mockBoard} viewer="public" />
      </main>
    </div>
  );
}
