"use client";

import { useEffect, useId, useRef } from "react";

import Modal from "@/components/Modal/Modal";
import styles from "./ConfirmDialog.module.css";

interface ConfirmDialogProps {
  open: boolean;
  heading: string;
  /** Texto explicativo. Aceita o nome do item para o usuario ter certeza. */
  message: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  /** "danger" pinta o botao de confirmacao com a cor de acao destrutiva. */
  tone?: "danger" | "neutral";
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Confirmacao de acao destrutiva.
 *
 * Nesta etapa atende a exclusao de tarefa. A exclusao de coluna (item 6)
 * precisa de tres opcoes e sera tratada na Etapa 4 — por isso o componente
 * ficou generico o bastante para receber rotulos, mas ainda com um unico
 * caminho de confirmacao, sem antecipar o que nao foi validado.
 */
export default function ConfirmDialog({
  open,
  heading,
  message,
  confirmLabel,
  cancelLabel = "Cancelar",
  tone = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const headingId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  // O foco inicial vai para Cancelar: em dialogo destrutivo, a tecla Enter
  // por reflexo nao deve executar a exclusao.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => cancelRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  return (
    <Modal open={open} onClose={onCancel} labelledBy={headingId}>
      <div className={styles.wrapper} role="alertdialog" aria-modal="true">
        <div className={styles.body}>
          <h2 className={styles.heading} id={headingId}>
            {heading}
          </h2>
          <div className={styles.message}>{message}</div>
        </div>

        <footer className={styles.footer}>
          <button
            ref={cancelRef}
            type="button"
            className={styles.secondaryButton}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`${styles.confirmButton} ${
              tone === "danger" ? styles.danger : styles.neutral
            }`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </footer>
      </div>
    </Modal>
  );
}
