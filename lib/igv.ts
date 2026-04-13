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

export type ParseAmountError = "empty" | "invalid" | "negative";

export type ParseAmountResult =
  | { ok: true; value: number }
  | { ok: false; error: ParseAmountError };

/**
 * Parses a user-entered amount. Accepts comma or dot as decimal separator.
 */
export function parseAmount(raw: string): ParseAmountResult {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return { ok: false, error: "empty" };
  }

  const normalized = trimmed.replace(/\s/g, "").replace(",", ".");
  const value = Number(normalized);

  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return { ok: false, error: "invalid" };
  }

  if (value < 0) {
    return { ok: false, error: "negative" };
  }

  return { ok: true, value };
}

export function formatPen(value: number): string {
  return new Intl.NumberFormat("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatResultsForCopy(result: IgvResult): string {
  const lines = [
    `Subtotal / Base: S/ ${formatPen(result.base)}`,
    `IGV (18%): S/ ${formatPen(result.igv)}`,
    `Total: S/ ${formatPen(result.total)}`,
  ];
  return lines.join("\n");
}
