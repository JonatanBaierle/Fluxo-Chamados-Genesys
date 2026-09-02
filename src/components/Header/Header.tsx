import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import styles from "./Header.module.css";

/** Cabecalho fixo da aplicacao: logo a esquerda, acesso admin a direita. */
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Ir para o quadro">
          <Logo height={56} />
        </Link>

        <Link href="/admin" className={styles.adminLink}>
          <svg
            className={styles.adminIcon}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 2.5 4.6 4.7v4.1c0 3.3 2.2 6.4 5.4 7.4 3.2-1 5.4-4.1 5.4-7.4V4.7L10 2.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="m7.9 9.8 1.6 1.6 3-3.2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.adminLabel}>Area administrativa</span>
          <span className={styles.adminLabelShort}>Admin</span>
        </Link>
      </div>
    </header>
  );
}
