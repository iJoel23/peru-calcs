"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorResultsPanel } from "@/components/CalculatorResultsPanel";
import {
  CALCULATOR_RESULT_ERROR_ID,
  calculatorFormCardClassName,
  calculatorInputClassName,
  calculatorLabelClassName,
} from "@/components/calculator-ui";
import { useCalculatorCopy } from "@/components/use-calculator-copy";
import {
  calculateDiscount,
  formatDiscountForCopy,
  type DiscountResult,
} from "@/lib/discount";
import { formatPen } from "@/lib/format";
import { parseNonNegativeAmount as parseAmount } from "@/lib/parse";

function fieldError(
  field: "price" | "percent",
  parsed: ReturnType<typeof parseAmount>,
): string | null {
  if (parsed.ok) return null;
  switch (parsed.error) {
    case "empty":
      return null;
    case "invalid":
      return field === "percent"
        ? "Ingresa un descuento válido."
        : "Ingresa un precio válido.";
    case "negative":
      return field === "percent"
        ? "El descuento no puede ser negativo."
        : "El precio no puede ser negativo.";
    default:
      return null;
  }
}

function combineErrors(
  priceRaw: string,
  discountRaw: string,
  priceParsed: ReturnType<typeof parseAmount>,
  discountParsed: ReturnType<typeof parseAmount>,
): string | null {
  const pTrim = priceRaw.trim();
  const dTrim = discountRaw.trim();
  const pEmpty = pTrim === "";
  const dEmpty = dTrim === "";

  if (pEmpty && dEmpty) return null;

  if (pEmpty || dEmpty) {
    return "Completa el precio original y el descuento.";
  }

  const pe = fieldError("price", priceParsed);
  const de = fieldError("percent", discountParsed);
  if (pe ?? de) return pe ?? de;

  if (priceParsed.ok && discountParsed.ok && discountParsed.value > 100) {
    return "El descuento no puede ser mayor al 100%.";
  }

  return null;
}

export function DiscountCalculatorForm() {
  const [precioOriginal, setPrecioOriginal] = useState("");
  const [descuentoPct, setDescuentoPct] = useState("");
  const deferredPrecio = useDeferredValue(precioOriginal);
  const deferredDescuento = useDeferredValue(descuentoPct);
  const { copyState, copy } = useCalculatorCopy();

  const parsedPrecio = useMemo(
    () => parseAmount(precioOriginal),
    [precioOriginal],
  );
  const parsedDescuento = useMemo(
    () => parseAmount(descuentoPct),
    [descuentoPct],
  );
  const deferredParsedPrecio = useMemo(
    () => parseAmount(deferredPrecio),
    [deferredPrecio],
  );
  const deferredParsedDescuento = useMemo(
    () => parseAmount(deferredDescuento),
    [deferredDescuento],
  );

  const errorMessage = useMemo(
    () =>
      combineErrors(
        precioOriginal,
        descuentoPct,
        parsedPrecio,
        parsedDescuento,
      ),
    [precioOriginal, descuentoPct, parsedPrecio, parsedDescuento],
  );

  const result = useMemo((): DiscountResult | null => {
    if (!deferredParsedPrecio.ok || !deferredParsedDescuento.ok) return null;
    if (deferredParsedDescuento.value > 100) return null;
    return calculateDiscount(
      deferredParsedPrecio.value,
      deferredParsedDescuento.value,
    );
  }, [deferredParsedPrecio, deferredParsedDescuento]);

  const pTrim = precioOriginal.trim();
  const dTrim = descuentoPct.trim();
  const bothEmpty = pTrim === "" && dTrim === "";

  const isResultStale =
    (precioOriginal !== deferredPrecio || descuentoPct !== deferredDescuento) &&
    !errorMessage &&
    !bothEmpty &&
    pTrim !== "" &&
    dTrim !== "";

  const presentationResult = errorMessage ? null : result;

  function handleCopy() {
    if (presentationResult) {
      void copy(formatDiscountForCopy(presentationResult));
    }
  }

  return (
    <div className="space-y-6">
      <div className={calculatorFormCardClassName}>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="precio-original"
              className={calculatorLabelClassName}
            >
              Precio original (S/)
            </label>
            <input
              id="precio-original"
              name="precio-original"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0.00"
              value={precioOriginal}
              onChange={(e) => setPrecioOriginal(e.target.value)}
              className={calculatorInputClassName}
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={
                errorMessage ? CALCULATOR_RESULT_ERROR_ID : undefined
              }
            />
          </div>

          <div>
            <label
              htmlFor="descuento-porcentaje"
              className={calculatorLabelClassName}
            >
              Descuento (%)
            </label>
            <input
              id="descuento-porcentaje"
              name="descuento-porcentaje"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0"
              value={descuentoPct}
              onChange={(e) => setDescuentoPct(e.target.value)}
              className={calculatorInputClassName}
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={
                errorMessage ? CALCULATOR_RESULT_ERROR_ID : undefined
              }
            />
          </div>
        </div>
      </div>

      <AdPlaceholder size="rectangle" />

      <CalculatorResultsPanel
        placeholderMessage="Ingresa el precio original y el descuento para ver el cálculo."
        errorMessage={errorMessage}
        isEmpty={bothEmpty}
        isLoading={isResultStale}
        hasResult={presentationResult != null}
        onCopy={handleCopy}
        copyState={copyState}
      >
        {presentationResult && (
          <>
            <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
              <dt className="text-sm text-slate-700 dark:text-slate-300">
                Precio original
              </dt>
              <dd className="font-mono text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
                S/ {formatPen(presentationResult.precioOriginal)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
              <dt className="text-sm text-slate-700 dark:text-slate-300">
                Descuento aplicado
              </dt>
              <dd className="font-mono text-lg font-semibold tabular-nums text-indigo-600 dark:text-indigo-400">
                S/ {formatPen(presentationResult.descuentoAplicado)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Precio final
              </dt>
              <dd className="font-mono text-xl font-bold tabular-nums text-slate-900 dark:text-white">
                S/ {formatPen(presentationResult.precioFinal)}
              </dd>
            </div>
          </>
        )}
      </CalculatorResultsPanel>
    </div>
  );
}
