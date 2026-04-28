"use client";

import {
  calculatorTabBaseClassName,
  calculatorTabIdleClassName,
  calculatorTabSelectedClassName,
} from "@/components/calculator-ui";

type CalculatorModeTabsProps<T extends string> = {
  modes: readonly { id: T; label: string }[];
  mode: T;
  onModeChange: (mode: T) => void;
  ariaLabel: string;
  columnsClassName: string;
};

export function CalculatorModeTabs<T extends string>({
  modes,
  mode,
  onModeChange,
  ariaLabel,
  columnsClassName,
}: CalculatorModeTabsProps<T>) {
  return (
    <div
      className={`grid grid-cols-1 gap-2 ${columnsClassName}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {modes.map(({ id, label }) => {
        const selected = mode === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onModeChange(id)}
            className={`${calculatorTabBaseClassName} ${
              selected
                ? calculatorTabSelectedClassName
                : calculatorTabIdleClassName
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
