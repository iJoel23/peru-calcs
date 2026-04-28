import { formatPen, formatSol, formatUsd } from "@/lib/format";
import {
  parseStrictPositiveAmount,
  type ParseStrictPositiveResult,
} from "@/lib/parse";

/** Default soles per US$1 for manual entry (illustrative). */
export const DEFAULT_EXCHANGE_RATE = 3.75;

export type ExchangeMode = "soles-a-dolares" | "dolares-a-soles";

export type ParseExchangeResult = ParseStrictPositiveResult;

/** Parses monto / tipo de cambio: must be greater than zero. */
export const parseExchangeAmount = parseStrictPositiveAmount;

export interface ExchangeResult {
  mode: ExchangeMode;
  montoIngresado: number;
  tipoCambio: number;
  resultado: number;
}

export function calculateExchange(
  mode: ExchangeMode,
  monto: number,
  tipoCambio: number,
): ExchangeResult {
  const resultado =
    mode === "soles-a-dolares" ? monto / tipoCambio : monto * tipoCambio;
  return {
    mode,
    montoIngresado: monto,
    tipoCambio,
    resultado,
  };
}

export function formatSolDisplay(value: number): string {
  return formatSol(value);
}

export function formatUsdDisplay(value: number): string {
  return formatUsd(value);
}

export function formatTipoCambioUsado(tipoCambio: number): string {
  return `S/ ${formatPen(tipoCambio)} por US$ 1`;
}

const MODE_LABEL: Record<ExchangeMode, string> = {
  "soles-a-dolares": "Soles a dólares",
  "dolares-a-soles": "Dólares a soles",
};

export function formatExchangeForCopy(result: ExchangeResult): string {
  const montoLine =
    result.mode === "soles-a-dolares"
      ? `Monto ingresado: ${formatSolDisplay(result.montoIngresado)}`
      : `Monto ingresado: ${formatUsdDisplay(result.montoIngresado)}`;

  const resultadoLine =
    result.mode === "soles-a-dolares"
      ? `Resultado convertido: ${formatUsdDisplay(result.resultado)}`
      : `Resultado convertido: ${formatSolDisplay(result.resultado)}`;

  return [
    `Modo: ${MODE_LABEL[result.mode]}`,
    montoLine,
    `Tipo de cambio usado: ${formatTipoCambioUsado(result.tipoCambio)}`,
    resultadoLine,
  ].join("\n");
}
