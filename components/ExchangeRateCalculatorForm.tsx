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
import {
  calculateExchange,
  DEFAULT_EXCHANGE_RATE,
  formatExchangeForCopy,
  formatSolDisplay,
  formatTipoCambioUsado,
  formatUsdDisplay,
  type ExchangeMode,
  type ExchangeResult,
  parseExchangeAmount,
} from "@/lib/exchange-rate";

const MODES: { id: ExchangeMode; label: string }[] = [
  { id: "soles-a-dolares", label: "Soles a dólares" },
  { id: "dolares-a-soles", label: "Dólares a soles" },
];

function fieldError(
  field: "monto" | "tipo",
  parsed: ReturnType<typeof parseExchangeAmount>,
): string | null {
  if (parsed.ok) return null;
  switch (parsed.error) {
    case "empty":
      return null;
    case "invalid":
      return field === "tipo"
        ? "Ingresa un tipo de cambio válido."
        : "Ingresa un monto válido.";
    case "negative":
      return field === "tipo"
        ? "El tipo de cambio no puede ser negativo."
        : "El monto no puede ser negativo.";
    case "zero":
      return field === "tipo"
        ? "El tipo de cambio debe ser mayor que cero."
        : "El monto debe ser mayor que cero.";
    default:
      return null;
  }
}

function combineErrors(
  montoRaw: string,
  tipoRaw: string,
  montoParsed: ReturnType<typeof parseExchangeAmount>,
  tipoParsed: ReturnType<typeof parseExchangeAmount>,
): string | null {
  const mTrim = montoRaw.trim();
  const tTrim = tipoRaw.trim();
  const mEmpty = mTrim === "";
  const tEmpty = tTrim === "";

  if (mEmpty && tEmpty) return null;

  if (mEmpty && !tEmpty) {
    return fieldError("tipo", tipoParsed);
  }

  if (!mEmpty && tEmpty) {
    return (
      fieldError("monto", montoParsed) ?? "Completa el tipo de cambio."
    );
  }

  return fieldError("monto", montoParsed) ?? fieldError("tipo", tipoParsed);
}

export function ExchangeRateCalculatorForm() {
  const [mode, setMode] = useState<ExchangeMode>("soles-a-dolares");
  const [monto, setMonto] = useState("");
  const [tipoCambio, setTipoCambio] = useState(
    String(DEFAULT_EXCHANGE_RATE),
  );
  const deferredMonto = useDeferredValue(monto);
  const deferredTipo = useDeferredValue(tipoCambio);
  const { copyState, copy } = useCalculatorCopy();

  const parsedMonto = useMemo(() => parseExchangeAmount(monto), [monto]);
  const parsedTipo = useMemo(
    () => parseExchangeAmount(tipoCambio),
    [tipoCambio],
  );
  const deferredParsedMonto = useMemo(
    () => parseExchangeAmount(deferredMonto),
    [deferredMonto],
  );
  const deferredParsedTipo = useMemo(
    () => parseExchangeAmount(deferredTipo),
    [deferredTipo],
  );

  const errorMessage = useMemo(
    () => combineErrors(monto, tipoCambio, parsedMonto, parsedTipo),
    [monto, tipoCambio, parsedMonto, parsedTipo],
  );

  const result = useMemo((): ExchangeResult | null => {
    if (!deferredParsedMonto.ok || !deferredParsedTipo.ok) return null;
    return calculateExchange(
      mode,
      deferredParsedMonto.value,
      deferredParsedTipo.value,
    );
  }, [mode, deferredParsedMonto, deferredParsedTipo]);

  const mTrim = monto.trim();
  const tTrim = tipoCambio.trim();
  const isInputEmpty = !errorMessage && mTrim === "";

  const isResultStale =
    (monto !== deferredMonto || tipoCambio !== deferredTipo) &&
    !errorMessage &&
    mTrim !== "" &&
    tTrim !== "";

  const presentationResult = errorMessage ? null : result;

  function handleCopy() {
    if (presentationResult) {
      void copy(formatExchangeForCopy(presentationResult));
    }
  }

  return (
    <div className="space-y-6">
      <div className={calculatorFormCardClassName}>
        <CalculatorModeTabs
          modes={MODES}
          mode={mode}
          onModeChange={setMode}
          ariaLabel="Dirección de conversión"
          columnsClassName="sm:grid-cols-2"
        />

        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="exchange-monto"
              className={calculatorLabelClassName}
            >
              {mode === "soles-a-dolares"
                ? "Monto en soles (S/)"
                : "Monto en dólares (US$)"}
            </label>
            <input
              id="exchange-monto"
              name="exchange-monto"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0.00"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className={calculatorInputClassName}
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={
                errorMessage ? CALCULATOR_RESULT_ERROR_ID : undefined
              }
            />
          </div>

          <div>
            <label
              htmlFor="exchange-rate"
              className={calculatorLabelClassName}
            >
              Tipo de cambio (soles por US$ 1)
            </label>
            <input
              id="exchange-rate"
              name="exchange-rate"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder={String(DEFAULT_EXCHANGE_RATE)}
              value={tipoCambio}
              onChange={(e) => setTipoCambio(e.target.value)}
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
        placeholderMessage="Ingresa el monto y el tipo de cambio para ver la conversión."
        errorMessage={errorMessage}
        isEmpty={isInputEmpty}
        isLoading={isResultStale}
        hasResult={presentationResult != null}
        onCopy={handleCopy}
        copyState={copyState}
      >
        {presentationResult && (
          <>
            <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
              <dt className="text-sm text-slate-700 dark:text-slate-300">
                Monto ingresado
              </dt>
              <dd className="font-mono text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
                {presentationResult.mode === "soles-a-dolares"
                  ? formatSolDisplay(presentationResult.montoIngresado)
                  : formatUsdDisplay(presentationResult.montoIngresado)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-800">
              <dt className="text-sm text-slate-700 dark:text-slate-300">
                Tipo de cambio usado
              </dt>
              <dd className="font-mono text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
                {formatTipoCambioUsado(presentationResult.tipoCambio)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Resultado convertido
              </dt>
              <dd className="font-mono text-xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                {presentationResult.mode === "soles-a-dolares"
                  ? formatUsdDisplay(presentationResult.resultado)
                  : formatSolDisplay(presentationResult.resultado)}
              </dd>
            </div>
          </>
        )}
      </CalculatorResultsPanel>
    </div>
  );
}
