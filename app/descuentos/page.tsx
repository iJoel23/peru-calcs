import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DiscountCalculatorForm } from "@/components/DiscountCalculatorForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Calculadora de descuentos | PeruCalcs",
  description:
    "Calcula el precio final en soles después de aplicar un descuento porcentual al instante.",
};

const FAQ_ITEMS = [
  {
    question: "¿Cómo calculo el monto del descuento?",
    answer:
      "Multiplicas el precio original por el porcentaje de descuento y divides entre 100. Por ejemplo, un 20% sobre S/ 100 es (100 × 20) / 100 = S/ 20 de descuento.",
  },
  {
    question: "¿Cómo obtengo el precio final?",
    answer:
      "Restas el monto del descuento al precio original. Con el ejemplo anterior: S/ 100 − S/ 20 = S/ 80.",
  },
  {
    question: "¿Esta herramienta incluye IGV u otros cargos?",
    answer:
      "No: trabaja solo con el precio y el porcentaje que ingreses. Si necesitas impuestos u otros conceptos, haz esos cálculos aparte o usa la calculadora de IGV en el inicio.",
  },
] as const;

export default function DescuentosPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 dark:bg-slate-950">
      <SiteHeader />

      <main id="contenido-principal" className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col gap-16 md:gap-20">
            <section
              aria-labelledby="discount-calculator-heading"
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
                    Descuentos
                  </span>
                </nav>
                <h1
                  id="discount-calculator-heading"
                  className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
                >
                  Calculadora de descuentos
                </h1>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                  Calcula el precio final después de aplicar un descuento.
                </p>
              </div>

              <div className="mx-auto mt-8 w-full max-w-lg">
                <AdPlaceholder size="banner" />
              </div>

              <div className="mx-auto mt-10 max-w-lg">
                <DiscountCalculatorForm />
              </div>
            </section>

            <section
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              aria-labelledby="descuentos-education-heading"
            >
              <h2
                id="descuentos-education-heading"
                className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
              >
                ¿Cómo calcular descuentos?
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <p>
                  Un{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    descuento porcentual
                  </strong>{" "}
                  reduce el precio en una fracción del valor original. La parte
                  descontada se obtiene con la fórmula:{" "}
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    descuento = precio original × (porcentaje ÷ 100)
                  </span>
                  .
                </p>
                <p>
                  El{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    precio final
                  </strong>{" "}
                  es lo que pagarías tras aplicar el descuento:{" "}
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    precio final = precio original − descuento
                  </span>
                  . Así puedes comparar ofertas, liquidaciones o reglas comerciales
                  de forma rápida en soles.
                </p>
              </div>
            </section>

            <section
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              aria-labelledby="descuentos-faq-heading"
            >
              <h2
                id="descuentos-faq-heading"
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
