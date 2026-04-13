"use client";

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
    <div
      className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      role="tablist"
      aria-label="Modo de cálculo"
    >
      {MODES.map(({ id, label }) => {
        const selected = mode === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onModeChange(id)}
            className={`rounded-xl px-4 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
              selected
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
