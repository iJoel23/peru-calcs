"use client";

import type { ReactNode } from "react";
import {
  CALCULATOR_RESULT_ERROR_ID,
  calculatorCopyButtonClassName,
  calculatorErrorClassName,
  calculatorPlaceholderClassName,
  calculatorResultsCardClassName,
  calculatorResultsTitleClassName,
  calculatorUpdatingClassName,
} from "@/components/calculator-ui";
import type { CalculatorCopyState } from "@/components/use-calculator-copy";

type CalculatorResultsPanelProps = {
  placeholderMessage: string;
  errorMessage: string | null;
  isEmpty: boolean;
  isLoading: boolean;
  hasResult: boolean;
  onCopy: () => void;
  copyState: CalculatorCopyState;
  copyDisabled?: boolean;
  /** Rows inside a single `<dl>` when `hasResult` and no error. */
  children: ReactNode;
};

export function CalculatorResultsPanel({
  placeholderMessage,
  errorMessage,
  isEmpty,
  isLoading,
  hasResult,
  onCopy,
  copyState,
  copyDisabled = false,
  children,
}: CalculatorResultsPanelProps) {
  const showPlaceholder = isEmpty && !errorMessage;
  const showError = Boolean(errorMessage);
  const showResults = hasResult && !showError;

  return (
    <div className={calculatorResultsCardClassName}>
      <h2 className={calculatorResultsTitleClassName}>Resultados</h2>

      {showPlaceholder && (
        <div
          className={calculatorPlaceholderClassName}
          role="status"
          aria-live="polite"
        >
          <span className="text-2xl opacity-40" aria-hidden>
            —
          </span>
          <p>{placeholderMessage}</p>
        </div>
      )}

      {showError && (
        <div
          id={CALCULATOR_RESULT_ERROR_ID}
          className={calculatorErrorClassName}
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {showResults && (
        <>
          {isLoading && (
            <p
              className={calculatorUpdatingClassName}
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
            {children}
          </dl>

          <button
            type="button"
            onClick={onCopy}
            disabled={copyDisabled || copyState === "copying" || isLoading}
            className={calculatorCopyButtonClassName}
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
