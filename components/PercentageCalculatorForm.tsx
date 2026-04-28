"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorModeTabs } from "@/components/CalculatorModeTabs";
import { CalculatorResultsPanel } from "@/components/CalculatorResultsPanel";
import {
  CALCULATOR_RESULT_ERROR_ID,
  calculatorFormCardClassName,
  calculatorInputClassName,
  calculatorLabelClassName,
} from "@/components/calculator-ui";
import { useCalculatorCopy } from "@/components/use-calculator-copy";
import { formatPen } from "@/lib/format";
import { parseNonNegativeAmount as parseAmount } from "@/lib/parse";
import {
  calculatePercentage,
  formatPercentageForCopy,
  type PercentageMode,
  type PercentageResult,
} from "@/lib/percentage";

const MODES: { id: PercentageMode; label: string }[] = [
  { id: "calcular", label: "Calcular %" },
  { id: "aumentar", label: "Aumentar %" },
  { id: "reducir", label: "Reducir %" },
];

function fieldError(
  field: "percent" | "base",
  parsed: ReturnType<typeof parseAmount>,
): string | null {
  if (parsed.ok) return null;
  switch (parsed.error) {
    case "empty":
      return null;
    case "invalid":
      return field === "percent"
        ? "Ingresa un porcentaje válido."
        : "Ingresa un monto válido.";
    case "negative":
      return field === "percent"
        ? "El porcentaje no puede ser negativo."
        : "El monto no puede ser negativo.";
    default:
      return null;
  }
}

function combineErrors(
  percentRaw: string,
  baseRaw: string,
  percentParsed: ReturnType<typeof parseAmount>,
  baseParsed: ReturnType<typeof parseAmount>,
): string | null {
  const pTrim = percentRaw.trim();
  const bTrim = baseRaw.trim();
  const pEmpty = pTrim === "";
  const bEmpty = bTrim === "";

  if (pEmpty && bEmpty) return null;

  if (pEmpty || bEmpty) {
    return "Completa el porcentaje y el monto base.";
  }

  const pe = fieldError("percent", percentParsed);
  const be = fieldError("base", baseParsed);
  return pe ?? be;
}

export function PercentageCalculatorForm() {
  const [mode, setMode] = useState<PercentageMode>("calcular");
  const [percent, setPercent] = useState("");
  const [base, setBase] = useState("");
  const deferredPercent = useDeferredValue(percent);
  const deferredBase = useDeferredValue(base);
  const { copyState, copy } = useCalculatorCopy();

  const parsedPercent = useMemo(() => parseAmount(percent), [percent]);
  const parsedBase = useMemo(() => parseAmount(base), [base]);
  const deferredParsedPercent = useMemo(
    () => parseAmount(deferredPercent),
    [deferredPercent],
  );
  const deferredParsedBase = useMemo(
    () => parseAmount(deferredBase),
    [deferredBase],
  );

  const errorMessage = useMemo(
    () => combineErrors(percent, base, parsedPercent, parsedBase),
    [percent, base, parsedPercent, parsedBase],
  );

  const result = useMemo((): PercentageResult | null => {
    if (!deferredParsedPercent.ok || !deferredParsedBase.ok) return null;
    return calculatePercentage(
      mode,
      deferredParsedPercent.value,
      deferredParsedBase.value,
    );
  }, [mode, deferredParsedPercent, deferredParsedBase]);

  const pTrim = percent.trim();
  const bTrim = base.trim();
  const bothEmpty = pTrim === "" && bTrim === "";

  const isResultStale =
    (percent !== deferredPercent || base !== deferredBase) &&
    !errorMessage &&
    !bothEmpty &&
    pTrim !== "" &&
    bTrim !== "";

  const presentationResult = errorMessage ? null : result;

  function handleCopy() {
    if (presentationResult) {
      void copy(formatPercentageForCopy(presentationResult));
    }
  }

  return (
    <div className="space-y-6">
      <div className={calculatorFormCardClassName}>
        <CalculatorModeTabs
          modes={MODES}
          mode={mode}
          onModeChange={setMode}
          ariaLabel="Modo de cálculo de porcentajes"
          columnsClassName="sm:grid-cols-3"
        />

        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="percentage"
              className={calculatorLabelClassName}
            >
              Porcentaje (%)
            </label>
            <input
              id="percentage"
              name="percentage"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className={calculatorInputClassName}
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={
                errorMessage ? CALCULATOR_RESULT_ERROR_ID : undefined
              }
            />
          </div>

          <div>
            <label
              htmlFor="base-amount"
              className={calculatorLabelClassName}
            >
              Monto base (S/)
            </label>
            <input
              id="base-amount"
              name="base-amount"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0.00"
              value={base}
              onChange={(e) => setBase(e.target.value)}
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
        placeholderMessage="Ingresa el porcentaje y el monto base para ver el cálculo."
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
                Porcentaje
              </dt>
              <dd className="font-mono text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
                {formatPen(presentationResult.percent)}%
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
              <dt className="text-sm text-slate-700 dark:text-slate-300">
                Monto base
              </dt>
              <dd className="font-mono text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
                S/ {formatPen(presentationResult.base)}
              </dd>
            </div>

            {presentationResult.mode === "calcular" && (
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Resultado
                </dt>
                <dd className="font-mono text-xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                  S/ {formatPen(presentationResult.value)}
                </dd>
              </div>
            )}

            {presentationResult.mode === "aumentar" && (
              <>
                <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
                  <dt className="text-sm text-slate-700 dark:text-slate-300">
                    Incremento
                  </dt>
                  <dd className="font-mono text-lg font-semibold tabular-nums text-indigo-600 dark:text-indigo-400">
                    S/ {formatPen(presentationResult.portion)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Total
                  </dt>
                  <dd className="font-mono text-xl font-bold tabular-nums text-slate-900 dark:text-white">
                    S/ {formatPen(presentationResult.value)}
                  </dd>
                </div>
              </>
            )}

            {presentationResult.mode === "reducir" && (
              <>
                <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
                  <dt className="text-sm text-slate-700 dark:text-slate-300">
                    Reducción
                  </dt>
                  <dd className="font-mono text-lg font-semibold tabular-nums text-indigo-600 dark:text-indigo-400">
                    S/ {formatPen(presentationResult.portion)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Total
                  </dt>
                  <dd className="font-mono text-xl font-bold tabular-nums text-slate-900 dark:text-white">
                    S/ {formatPen(presentationResult.value)}
                  </dd>
                </div>
              </>
            )}
          </>
        )}
      </CalculatorResultsPanel>
    </div>
  );
}
