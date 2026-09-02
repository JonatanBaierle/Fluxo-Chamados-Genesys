import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import styles from "./page.module.css";

/**
 * Espaco reservado da area administrativa.
 * O login por senha e o painel de gestao entram na Etapa 4. A rota existe
 * desde ja para que o link do cabecalho nao caia em pagina inexistente.
 */
export default function AdminPlaceholderPage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <Logo height={76} variant="login" />
        <h1 className={styles.title}>Area administrativa</h1>
        <p className={styles.text}>
          O acesso por senha e o painel de gestao de colunas, permissoes e
          tarefas serao implementados na Etapa 4.
        </p>
        <Link href="/" className={styles.link}>
          Voltar ao quadro
        </Link>
      </div>
    </main>
  );
}
