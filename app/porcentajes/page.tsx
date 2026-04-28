import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { PercentageCalculatorForm } from "@/components/PercentageCalculatorForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Calculadora de porcentajes | PeruCalcs",
  description:
    "Calcula porcentajes de un monto en soles: cuánto representa un %, aumentos y reducciones al instante.",
};

const FAQ_ITEMS = [
  {
    question: "¿Cómo calculo cuánto es un porcentaje de un monto?",
    answer:
      "Multiplicas el monto base por el porcentaje y divides entre 100. Por ejemplo, el 18% de S/ 100 es (100 × 18) / 100 = S/ 18.",
  },
  {
    question: "¿Qué diferencia hay entre aumentar y reducir un porcentaje?",
    answer:
      "Aumentar suma al monto base la parte proporcional al porcentaje. Reducir la resta. Ambos usan la misma base para calcular esa parte.",
  },
  {
    question: "¿Los resultados incluyen impuestos u otros cargos?",
    answer:
      "No: es un cálculo matemático sobre el monto y el porcentaje que ingreses. Úsalo como referencia y ajusta según tu caso (IGV, redondeos, etc.).",
  },
] as const;

export default function PorcentajesPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 dark:bg-slate-950">
      <SiteHeader />

      <main id="contenido-principal" className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col gap-16 md:gap-20">
            <section
              aria-labelledby="percentage-calculator-heading"
              className="scroll-mt-8"
            >
              <div className="mx-auto max-w-lg text-center">
                <nav
                  className="mb-6 text-sm text-slate-600 dark:text-slate-400"
                  aria-label="Migas de pan"
                >
                  <Link
                    href="/"
                    className="font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
                  >
                    Inicio
                  </Link>
                  <span className="mx-2 text-slate-400" aria-hidden>
                    /
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Porcentajes
                  </span>
                </nav>
                <h1
                  id="percentage-calculator-heading"
                  className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
                >
                  Calculadora de porcentajes
                </h1>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                  Obtén el valor de un porcentaje sobre un monto en soles, o aplica
                  un aumento o una reducción porcentual de forma inmediata.
                </p>
              </div>

              <div className="mx-auto mt-8 w-full max-w-lg">
                <AdPlaceholder size="banner" />
              </div>

              <div className="mx-auto mt-10 max-w-lg">
                <PercentageCalculatorForm />
              </div>
            </section>

            <section
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              aria-labelledby="porcentajes-faq-heading"
            >
              <h2
                id="porcentajes-faq-heading"
                className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
              >
                Preguntas frecuentes
              </h2>
              <ul className="mt-8 space-y-8">
                {FAQ_ITEMS.map((item) => (
                  <li key={item.question}>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {item.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <AdPlaceholder size="banner" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
