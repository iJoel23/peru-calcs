"use client";

import { CalculatorResultsPanel } from "@/components/CalculatorResultsPanel";
import { useCalculatorCopy } from "@/components/use-calculator-copy";
import { formatPen } from "@/lib/format";
import type { IgvResult } from "@/lib/igv";
import { formatResultsForCopy } from "@/lib/igv";

type ResultCardProps = {
  result: IgvResult | null;
  isEmpty: boolean;
  errorMessage: string | null;
  /** True while deferred calculation catches up (e.g. fast typing). */
  isLoading?: boolean;
};

export function ResultCard({
  result,
  isEmpty,
  errorMessage,
  isLoading = false,
}: ResultCardProps) {
  const { copyState, copy } = useCalculatorCopy();

  function handleCopy() {
    if (result) {
      void copy(formatResultsForCopy(result));
    }
  }

  return (
    <CalculatorResultsPanel
      placeholderMessage="Ingresa un monto para ver el cálculo."
      errorMessage={errorMessage}
      isEmpty={isEmpty}
      isLoading={isLoading}
      hasResult={result != null}
      onCopy={handleCopy}
      copyState={copyState}
    >
      {result && (
        <>
          <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
            <dt className="text-sm text-slate-700 dark:text-slate-300">
              Subtotal / Base
            </dt>
            <dd className="font-mono text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
              S/ {formatPen(result.base)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
            <dt className="text-sm text-slate-700 dark:text-slate-300">
              IGV (18%)
            </dt>
            <dd className="font-mono text-lg font-semibold tabular-nums text-indigo-600 dark:text-indigo-400">
              S/ {formatPen(result.igv)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Total
            </dt>
            <dd className="font-mono text-xl font-bold tabular-nums text-slate-900 dark:text-white">
              S/ {formatPen(result.total)}
            </dd>
          </div>
        </>
      )}
    </CalculatorResultsPanel>
  );
}
