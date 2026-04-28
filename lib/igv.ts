import { formatPen as formatPenAmount } from "@/lib/format";

/** IGV general rate in Peru (18%). */
export const IGV_RATE = 0.18;

/** Multiplier for adding IGV to a base amount. */
export const IGV_MULTIPLIER = 1.18;

export type IgvMode = "agregar" | "quitar" | "calcular";

export interface IgvResult {
  /** Subtotal or tax base (monto sin IGV). */
  base: number;
  /** IGV amount. */
  igv: number;
  /** Total including IGV where applicable. */
  total: number;
}

/**
 * Computes base, IGV and total for the selected mode.
 * `amount` must be a non-negative finite number.
 */
export function calculateIgv(mode: IgvMode, amount: number): IgvResult {
  switch (mode) {
    case "agregar": {
      const total = amount * IGV_MULTIPLIER;
      const igv = total - amount;
      return { base: amount, igv, total };
    }
    case "quitar": {
      const base = amount / IGV_MULTIPLIER;
      const igv = amount - base;
      return { base, igv, total: amount };
    }
    case "calcular": {
      const igv = amount * IGV_RATE;
      const total = amount + igv;
      return { base: amount, igv, total };
    }
  }
}

export type ParseAmountError = import("@/lib/parse").ParseNonNegativeError;

export type ParseAmountResult = import("@/lib/parse").ParseNonNegativeResult;

export { parseNonNegativeAmount as parseAmount } from "@/lib/parse";

export { formatPen } from "@/lib/format";

export function formatResultsForCopy(result: IgvResult): string {
  const lines = [
    `Subtotal / Base: S/ ${formatPenAmount(result.base)}`,
    `IGV (18%): S/ ${formatPenAmount(result.igv)}`,
    `Total: S/ ${formatPenAmount(result.total)}`,
  ];
  return lines.join("\n");
}
