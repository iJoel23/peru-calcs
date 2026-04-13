"use client";

import { useDeferredValue, useMemo, useState } from "react";
import {
  calculateIgv,
  parseAmount,
  type IgvMode,
} from "@/lib/igv";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ModeTabs } from "@/components/ModeTabs";
import { ResultCard } from "@/components/ResultCard";

function validationMessage(error: ReturnType<typeof parseAmount>): string | null {
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
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
        <ModeTabs mode={mode} onModeChange={setMode} />

        <div className="mt-6">
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200"
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
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-lg tabular-nums text-slate-900 shadow-sm outline-none ring-indigo-500/0 transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorMessage ? "amount-error" : undefined}
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
