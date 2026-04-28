"use client";

import { CalculatorModeTabs } from "@/components/CalculatorModeTabs";
import type { IgvMode } from "@/lib/igv";

const MODES: { id: IgvMode; label: string }[] = [
  { id: "agregar", label: "Agregar IGV" },
  { id: "quitar", label: "Quitar IGV" },
  { id: "calcular", label: "Calcular IGV" },
];

type ModeTabsProps = {
  mode: IgvMode;
  onModeChange: (mode: IgvMode) => void;
};

export function ModeTabs({ mode, onModeChange }: ModeTabsProps) {
  return (
    <CalculatorModeTabs
      modes={MODES}
      mode={mode}
      onModeChange={onModeChange}
      ariaLabel="Modo de cálculo de IGV"
      columnsClassName="sm:grid-cols-3"
    />
  );
}
