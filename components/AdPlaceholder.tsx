"use client";

type AdPlaceholderProps = {
  size: "banner" | "rectangle";
};

const sizeStyles = {
  banner: "min-h-[90px]",
  rectangle: "min-h-[250px]",
} as const;

/**
 * Visual placeholder for future ad slots (e.g. AdSense). No scripts or tracking.
 */
export function AdPlaceholder({ size }: AdPlaceholderProps) {
  return (
    <aside
      role="complementary"
      aria-label="Espacio publicitario reservado"
      className={`flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300/90 bg-slate-100/60 px-4 py-3 text-center dark:border-slate-600/80 dark:bg-slate-800/35 ${sizeStyles[size]}`}
    >
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Publicidad
      </span>
      <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Espacio publicitario
      </span>
    </aside>
  );
}
