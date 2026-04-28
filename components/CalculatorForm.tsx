"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import {
  CALCULATOR_RESULT_ERROR_ID,
  calculatorFormCardClassName,
  calculatorInputClassName,
  calculatorLabelClassName,
} from "@/components/calculator-ui";
import { ModeTabs } from "@/components/ModeTabs";
import { ResultCard } from "@/components/ResultCard";
import { calculateIgv, type IgvMode } from "@/lib/igv";
import { parseNonNegativeAmount as parseAmount } from "@/lib/parse";

function validationMessage(
  error: ReturnType<typeof parseAmount>,
): string | null {
  if (error.ok) return null;
  switch (error.error) {
    case "empty":
      return null;
    case "invalid":
      return "Ingresa un número válido.";
    case "negative":
      return "El monto no puede ser negativo.";
    default:
      return null;
  }
}

export function CalculatorForm() {
  const [mode, setMode] = useState<IgvMode>("agregar");
  const [amount, setAmount] = useState("");
  const deferredAmount = useDeferredValue(amount);

  const parsed = useMemo(() => parseAmount(amount), [amount]);
  const deferredParsed = useMemo(
    () => parseAmount(deferredAmount),
    [deferredAmount],
  );
  const errorMessage = validationMessage(parsed);

  const result = useMemo(() => {
    if (!deferredParsed.ok) return null;
    return calculateIgv(mode, deferredParsed.value);
  }, [mode, deferredParsed]);

  const isResultStale =
    amount.trim() !== "" &&
    deferredAmount !== amount &&
    !errorMessage;

  const isEmptyInput = amount.trim() === "";
  const isEmpty =
    isEmptyInput || (parsed.ok === false && parsed.error === "empty");

  return (
    <div className="space-y-6">
      <div className={calculatorFormCardClassName}>
        <ModeTabs mode={mode} onModeChange={setMode} />

        <div className="mt-6">
          <label
            htmlFor="amount"
            className={calculatorLabelClassName}
          >
            Monto (S/)
          </label>
          <input
            id="amount"
            name="amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={calculatorInputClassName}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={
              errorMessage ? CALCULATOR_RESULT_ERROR_ID : undefined
            }
          />
        </div>
      </div>

      <AdPlaceholder size="rectangle" />

      <ResultCard
        result={errorMessage ? null : result}
        isEmpty={isEmpty && !errorMessage}
        errorMessage={errorMessage}
        isLoading={isResultStale}
      />
    </div>
  );
}
