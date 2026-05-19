import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 py-10 dark:border-slate-800/80 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          © 2026 PeruCalcs
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Herramientas simples para cálculos útiles en Perú
        </p>
        <nav
          aria-label="Enlaces legales y contacto"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-indigo-600 dark:text-indigo-400"
        >
          <Link
            href="/privacy-policy"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            Política de privacidad
          </Link>
          <Link
            href="/terms"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            Términos y condiciones
          </Link>
          <Link
            href="/contact"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </footer>
  );
}
