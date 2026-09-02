/* =========================================================================
   Formatacao de datas.
   O fuso e fixo para que servidor e navegador gerem exatamente o mesmo texto
   e o React nao acuse divergencia de hidratacao.
   ========================================================================= */

const TIME_ZONE = "America/Sao_Paulo";

const shortDate = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  timeZone: TIME_ZONE,
});

const fullDateTime = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
});

/** Ex.: "28 de ago." -> "28 ago". Usado no rodape do card. */
export function formatShortDate(iso: string): string {
  return shortDate.format(new Date(iso)).replace(/\.$/, "").replace(" de ", " ");
}

/** Ex.: "28/08/2026 14:42". Usado no atributo title, ao passar o mouse. */
export function formatFullDateTime(iso: string): string {
  return fullDateTime.format(new Date(iso));
}
