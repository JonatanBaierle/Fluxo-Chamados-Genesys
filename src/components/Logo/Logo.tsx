"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Logo.module.css";

interface LogoProps {
  /** Arquivo dentro de /public/logos. */
  src?: string;
  /** Altura renderizada em px. A largura acompanha a proporcao original. */
  height?: number;
  variant?: "header" | "login";
}

/**
 * Exibe o logo oficial do projeto.
 *
 * A largura nunca e fixada: apenas a altura e definida e a largura fica em
 * "auto", preservando a proporcao original do arquivo (item 9).
 *
 * Enquanto os arquivos definitivos nao estao em /public/logos, um espaco
 * reservado com a mesma area ocupada e exibido, para que a troca posterior
 * nao altere o layout.
 */
export default function Logo({
  src = "/logos/logo-principal.png",
  height = 56,
  variant = "header",
}: LogoProps) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // A imagem e renderizada no servidor, entao a falha de carregamento pode
  // ocorrer antes da hidratacao — quando o onError ainda nao esta ligado.
  // Esta verificacao cobre esse caso.
  useEffect(() => {
    const image = imageRef.current;
    if (image && image.complete && image.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <div
        className={`${styles.placeholder} ${styles[variant]}`}
        style={{ height }}
        role="img"
        aria-label="Espaco reservado para o logo"
      >
        <span className={styles.placeholderText}>LOGO</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imageRef}
      className={styles.image}
      src={src}
      alt="Logo"
      style={{ height }}
      onError={() => setFailed(true)}
    />
  );
}
