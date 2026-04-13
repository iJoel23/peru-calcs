export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-4 py-8 text-center sm:py-10">
        <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          PeruCalcs
        </p>
        <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Calculadoras útiles para Perú
        </p>
      </div>
    </header>
  );
}
