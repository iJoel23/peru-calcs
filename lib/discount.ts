import { formatPen } from "@/lib/format";

export interface DiscountResult {
  precioOriginal: number;
  /** Monto descontado: precioOriginal × % / 100. */
  descuentoAplicado: number;
  precioFinal: number;
  descuentoPorcentaje: number;
}

/**
 * `precioOriginal` and `descuentoPorcentaje` must be non-negative finite numbers.
 */
export function calculateDiscount(
  precioOriginal: number,
  descuentoPorcentaje: number,
): DiscountResult {
  const descuentoAplicado = (precioOriginal * descuentoPorcentaje) / 100;
  const precioFinal = precioOriginal - descuentoAplicado;
  return {
    precioOriginal,
    descuentoAplicado,
    precioFinal,
    descuentoPorcentaje,
  };
}

export function formatDiscountForCopy(result: DiscountResult): string {
  return [
    `Precio original: S/ ${formatPen(result.precioOriginal)}`,
    `Descuento aplicado (${formatPen(result.descuentoPorcentaje)}%): S/ ${formatPen(result.descuentoAplicado)}`,
    `Precio final: S/ ${formatPen(result.precioFinal)}`,
  ].join("\n");
}
