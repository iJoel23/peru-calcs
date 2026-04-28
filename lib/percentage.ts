import { formatPen } from "@/lib/format";

export type PercentageMode = "calcular" | "aumentar" | "reducir";

export interface PercentageResult {
  mode: PercentageMode;
  /** Porcentaje ingresado (0–∞). */
  percent: number;
  /** Monto base (S/). */
  base: number;
  /** Parte porcentual del monto base: base × % / 100. */
  portion: number;
  /** Resultado principal según el modo. */
  value: number;
}

export function calculatePercentage(
  mode: PercentageMode,
  percent: number,
  base: number,
): PercentageResult {
  const portion = (base * percent) / 100;
  switch (mode) {
    case "calcular":
      return { mode, percent, base, portion, value: portion };
    case "aumentar":
      return { mode, percent, base, portion, value: base + portion };
    case "reducir":
      return { mode, percent, base, portion, value: base - portion };
  }
}

export function formatPercentageForCopy(result: PercentageResult): string {
  const lines: string[] = [
    `Porcentaje: ${formatPen(result.percent)}%`,
    `Monto base: S/ ${formatPen(result.base)}`,
  ];
  switch (result.mode) {
    case "calcular":
      lines.push(`Resultado (${result.percent}% de la base): S/ ${formatPen(result.value)}`);
      break;
    case "aumentar":
      lines.push(`Incremento: S/ ${formatPen(result.portion)}`);
      lines.push(`Total: S/ ${formatPen(result.value)}`);
      break;
    case "reducir":
      lines.push(`Reducción: S/ ${formatPen(result.portion)}`);
      lines.push(`Total: S/ ${formatPen(result.value)}`);
      break;
  }
  return lines.join("\n");
}
