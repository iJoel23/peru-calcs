import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Términos y condiciones | PeruCalcs",
  description:
    "Condiciones de uso de PeruCalcs: herramientas informativas, limitación de responsabilidad y uso aceptable del sitio.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 dark:bg-slate-950">
      <SiteHeader />

      <main id="contenido-principal" className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-none">
            <nav
              className="mb-8 text-sm text-slate-600 dark:text-slate-400"
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
                Términos y condiciones
              </span>
            </nav>

            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Términos y condiciones
              </h1>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Última actualización: 2026
              </p>

              <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <section aria-labelledby="terminos-proposito">
                  <h2
                    id="terminos-proposito"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    ¿Qué es PeruCalcs?
                  </h2>
                  <p className="mt-3">
                    PeruCalcs ofrece calculadoras y utilidades relacionadas con
                    números y el contexto cotidiano en Perú. Todo el contenido se
                    ofrece con fines{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      informativos y educativos
                    </strong>
                    , como ayuda rápida; no sustituye asesoría contable,
                    tributaria, legal ni financiera personalizada.
                  </p>
                </section>

                <section aria-labelledby="terminos-precision">
                  <h2
                    id="terminos-precision"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    Precisiones sobre los resultados
                  </h2>
                  <p className="mt-3">
                    Los cálculos dependen de lo que escribes en el sitio,
                    configuraciones locales (tipo de cambio editable, tasas estándar
                    donde aplique), redondeos y limitaciones tecnológicas. Los
                    resultados{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      pueden variar respecto al valor final en tu banco,
                      empresa o normativa vigente
                    </strong>
                    . Debes comprobar por tu cuenta antes de tomar cualquier decisión.
                  </p>
                </section>

                <section aria-labelledby="terminos-responsabilidad">
                  <h2
                    id="terminos-responsabilidad"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    Responsabilidad
                  </h2>
                  <p className="mt-3">
                    En la medida máxima permitida por la ley, PeruCalcs y quienes
                    lo mantienen{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      no se hacen responsables
                    </strong>{" "}
                    de pérdidas, daños, reclamos o consecuencias que surjan del uso
                    o la confianza en las herramientas del sitio. Sigues usando el
                    sitio con la conciencia de que es información general.
                  </p>
                </section>

                <section aria-labelledby="terminos-uso">
                  <h2
                    id="terminos-uso"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    Uso aceptable
                  </h2>
                  <p className="mt-3">
                    Esperamos un uso razonable: no usar el sitio para actividades
                    ilegales, intentar sobrecargar sistemas ni intentar obtener acceso
                    no autorizado. Podemos impedir comportamientos abusivos que pongan en
                    riesgo la experiencia del resto de visitantes.
                  </p>
                </section>

                <section aria-labelledby="terminos-cambios">
                  <h2
                    id="terminos-cambios"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    Cambios en el sitio y en estos textos
                  </h2>
                  <p className="mt-3">
                    Las herramientas, el diseño, la disponibilidad y estos términos
                    pueden{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      cambiar en cualquier momento y sin garantía previa
                    </strong>
                    . Te recomendamos revisar esta página de vez en cuando. Si tienes
                    dudas, escríbenos desde{" "}
                    <Link
                      href="/contact"
                      className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
                    >
                      contacto
                    </Link>
                    .
                  </p>
                </section>
              </div>
            </article>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
