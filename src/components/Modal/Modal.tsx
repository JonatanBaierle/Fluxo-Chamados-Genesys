"use client";

import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  open: boolean;
  /** Chamado ao clicar fora, pressionar Esc ou acionar o botao de fechar. */
  onClose: () => void;
  /** Id do elemento que da nome ao dialogo, para leitores de tela. */
  labelledBy: string;
  children: React.ReactNode;
}

/**
 * Casca reutilizavel de dialogo.
 *
 * Usa o elemento nativo <dialog> com showModal(). A escolha economiza codigo
 * e evita armadilhas de acessibilidade: o navegador ja prende o foco dentro
 * do dialogo, torna o resto da pagina inerte, fecha com Esc e desenha o
 * fundo escurecido via ::backdrop.
 *
 * O modal de tarefa e a confirmacao de exclusao compartilham esta casca, e a
 * confirmacao de exclusao de coluna (item 6, Etapa 4) vai usar a mesma.
 */
export default function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Mantem o estado do DOM alinhado com a prop `open`.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Impede a rolagem do fundo enquanto o dialogo esta aberto. O <dialog>
  // nativo bloqueia a interacao, mas nao a rolagem do body.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={labelledBy}
      // Esc dispara "cancel". Cancelamos o fechamento nativo para que o
      // React continue sendo a unica fonte de verdade do estado aberto.
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      // Clique no proprio <dialog> significa clique no fundo: o conteudo
      // fica dentro de .panel e para a propagacao ai.
      onMouseDown={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className={styles.panel}>{children}</div>
    </dialog>
  );
}
