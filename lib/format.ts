/**
 * Number and currency display helpers (Peru / Spanish locale).
 */

const ES_PE_2: Intl.NumberFormatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

/** Soles amount without the S/ prefix (uses es-PE grouping/decimals). */
export function formatPen(value: number): string {
  return new Intl.NumberFormat("es-PE", ES_PE_2).format(value);
}

/** Soles with S/ prefix. */
export function formatSol(value: number): string {
  return `S/ ${formatPen(value)}`;
}

/** US dollars with US$ prefix (numeric formatting es-PE). */
export function formatUsd(value: number): string {
  const formatted = new Intl.NumberFormat("es-PE", ES_PE_2).format(value);
  return `US$ ${formatted}`;
}
