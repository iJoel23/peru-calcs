import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ExchangeRateCalculatorForm } from "@/components/ExchangeRateCalculatorForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Tipo de cambio soles a dólares | PeruCalcs",
  description:
    "Convierte soles a dólares y dólares a soles usando un tipo de cambio editable con PeruCalcs.",
};

const FAQ_ITEMS = [
  {
    question: "¿Cómo convierto soles a dólares?",
    answer:
      "Divides el monto en soles entre el tipo de cambio (cuántos soles equivalen a un dólar). Por ejemplo, con S/ 375 y un tipo de 3,75: 375 ÷ 3,75 = US$ 100.",
  },
  {
    question: "¿Cómo convierto dólares a soles?",
    answer:
      "Multiplicas el monto en dólares por el tipo de cambio en soles por cada US$ 1. Con US$ 100 y 3,75: 100 × 3,75 = S/ 375.",
  },
  {
    question: "¿El tipo de cambio de esta página es el oficial del día?",
    answer:
      "No. Aquí ingresas tú el valor para practicar o estimar. En operaciones reales el tipo varía según el mercado, el banco o la casa de cambio; confirma siempre la cotización vigente antes de decidir.",
  },
] as const;

export default function TipoDeCambioPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 dark:bg-slate-950">
      <SiteHeader />

      <main id="contenido-principal" className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col gap-16 md:gap-20">
            <section
              aria-labelledby="exchange-calculator-heading"
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
                    Tipo de cambio
                  </span>
                </nav>
                <h1
                  id="exchange-calculator-heading"
                  className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
                >
                  Tipo de cambio
                </h1>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                  Convierte entre soles y dólares usando un tipo de cambio
                  editable.
                </p>
              </div>

              <div className="mx-auto mt-8 w-full max-w-lg">
                <AdPlaceholder size="banner" />
              </div>

              <div className="mx-auto mt-10 max-w-lg">
                <ExchangeRateCalculatorForm />
              </div>
            </section>

            <section
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              aria-labelledby="tipo-cambio-education-heading"
            >
              <h2
                id="tipo-cambio-education-heading"
                className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
              >
                Cómo funciona la conversión
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Soles a dólares
                </h3>
                <p>
                  Si tienes un monto en{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    soles
                  </strong>{" "}
                  y quieres saber cuánto representa en{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    dólares
                  </strong>
                  , divides entre el tipo de cambio expresado como soles por
                  cada US$ 1. Así obtienes el equivalente en dólares.
                </p>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Dólares a soles
                </h3>
                <p>
                  Si el monto está en{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    dólares
                  </strong>
                  , multiplicas por el mismo tipo de cambio (soles por dólar) para
                  obtener el equivalente en{" "}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    soles
                  </strong>
                  .
                </p>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  ¿Por qué el tipo de cambio cambia?
                </h3>
                <p>
                  El valor del sol frente al dólar{" "}
                  <strong className="font-medium">fluctúa</strong> por oferta y
                  demanda de divisas, decisiones de política monetaria, y
                  condiciones económicas locales y globales. Por eso la cotización
                  que ves en un banco, casa de cambio o noticia puede diferir de
                  la que anotaste hace unas horas.
                </p>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Antes de decidir con dinero real
                </h3>
                <p>
                  Esta herramienta es{" "}
                  <strong className="font-medium">orientativa</strong>: tú defines
                  el tipo de cambio a mano. Para{" "}
                  <strong className="font-medium">
                    transferencias, pagos o inversiones
                  </strong>
                  , verifica siempre el tipo vigente y los cargos con tu entidad
                  o asesor; no tomes decisiones importantes solo con un cálculo
                  genérico.
                </p>
              </div>
            </section>

            <section
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8"
              aria-labelledby="tipo-cambio-faq-heading"
            >
              <h2
                id="tipo-cambio-faq-heading"
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
