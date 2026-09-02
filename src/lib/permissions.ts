/* =========================================================================
   Leitura de permissoes para a INTERFACE (item 4: "a interface tambem devera
   ocultar ou desabilitar acoes que nao estejam disponiveis").

   Atencao: este arquivo responde apenas "o que desenhar na tela".
   A validacao que realmente bloqueia a acao roda no servidor e sera
   implementada na Etapa 5, conforme o item 13 da especificacao.
   ========================================================================= */

import type { Column, ColumnPermissions, Viewer } from "./types";

type PermissionKey = keyof ColumnPermissions;

/** O administrador tem controle completo; o usuario publico depende da coluna. */
export function can(
  viewer: Viewer,
  column: Column,
  action: PermissionKey,
): boolean {
  if (viewer === "admin") return true;
  return column.permissions[action];
}

/**
 * Uma movimentacao so aparece como possivel quando o usuario pode retirar da
 * coluna de origem E depositar na coluna de destino (item 5).
 */
export function canMoveBetween(
  viewer: Viewer,
  from: Column,
  to: Column,
): boolean {
  if (viewer === "admin") return true;
  if (from.id === to.id) return from.permissions.moveTaskOut;
  return from.permissions.moveTaskOut && to.permissions.receiveTask;
}
