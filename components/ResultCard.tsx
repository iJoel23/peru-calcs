"use client";

import { useState } from "react";
import type { IgvResult } from "@/lib/igv";
import { formatPen, formatResultsForCopy } from "@/lib/igv";

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
  const [copyState, setCopyState] = useState<"idle" | "copying" | "done">(
    "idle",
  );

  async function handleCopy() {
    if (!result) return;
    setCopyState("copying");
    try {
      await navigator.clipboard.writeText(formatResultsForCopy(result));
      setCopyState("done");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("idle");
    }
  }

  const showPlaceholder = isEmpty && !errorMessage;
  const showError = Boolean(errorMessage);
  const showResults = result && !showError;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
        Resultados
      </h2>

      {showPlaceholder && (
        <div
          className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50/80 py-8 text-center text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-300"
          role="status"
        >
          <span className="text-2xl opacity-40" aria-hidden>
            —
          </span>
          <p>Ingresa un monto para ver el cálculo.</p>
        </div>
      )}

      {showError && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {showResults && result && (
        <>
          {isLoading && (
            <p
              className="mb-3 text-xs font-medium text-indigo-600 dark:text-indigo-400"
              role="status"
              aria-live="polite"
            >
              Actualizando…
            </p>
          )}
          <dl
            className={`space-y-4 transition-opacity ${isLoading ? "opacity-60" : ""}`}
            aria-busy={isLoading}
          >
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
          </dl>

          <button
            type="button"
            onClick={handleCopy}
            disabled={copyState === "copying" || isLoading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {copyState === "copying" && "Copiando…"}
            {copyState === "done" && "¡Copiado!"}
            {copyState === "idle" && "Copiar resultados"}
          </button>
        </>
      )}
    </div>
  );
}
