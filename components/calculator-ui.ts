/** Shared Tailwind classes for calculator forms (single source of truth). */

export const CALCULATOR_RESULT_ERROR_ID = "perucalcs-result-error";

export const calculatorFormCardClassName =
  "rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900";

export const calculatorResultsCardClassName = calculatorFormCardClassName;

export const calculatorLabelClassName =
  "mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200";

export const calculatorInputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-lg tabular-nums text-slate-900 shadow-sm outline-none ring-indigo-500/0 transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400";

export const calculatorResultsTitleClassName =
  "mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300";

export const calculatorPlaceholderClassName =
  "flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50/80 py-8 text-center text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-300";

export const calculatorErrorClassName =
  "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200";

export const calculatorCopyButtonClassName =
  "mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700";

export const calculatorTabBaseClassName =
  "rounded-xl px-4 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900";

export const calculatorTabSelectedClassName =
  "bg-indigo-600 text-white shadow-md shadow-indigo-500/25";

export const calculatorTabIdleClassName =
  "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700";

export const calculatorUpdatingClassName =
  "mb-3 text-xs font-medium text-indigo-600 dark:text-indigo-400";
