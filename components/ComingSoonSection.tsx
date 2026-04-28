import Link from "next/link";

const CALCULATORS: { title: string; description: string; href: string }[] = [
  {
    title: "Calculadora de porcentajes",
    description:
      "Calcula porcentajes de un monto y variaciones de forma rápida, ideal para presupuestos y comparaciones.",
    href: "/porcentajes",
  },
  {
    title: "Calculadora de descuentos",
    description:
      "Aplica un descuento por porcentaje y ve el precio final al instante.",
    href: "/descuentos",
  },
  {
    title: "Tipo de cambio",
    description:
      "Convierte entre soles y dólares con un tipo de cambio que puedes editar al instante.",
    href: "/tipo-de-cambio",
  },
];

const CARD_LINK_CLASS =
  "flex h-full flex-col rounded-xl border border-slate-100 bg-slate-50/80 p-5 transition hover:border-indigo-200 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-indigo-900/60 dark:hover:bg-slate-800/80";

export function ComingSoonSection() {
  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8"
      aria-labelledby="available-calculators-heading"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="available-calculators-heading"
          className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
        >
          Calculadoras disponibles
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Explora todas las herramientas disponibles
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CALCULATORS.map((item) => (
          <li key={item.title}>
            <Link href={item.href} className={CARD_LINK_CLASS}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
              <span className="mt-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Abrir calculadora →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
