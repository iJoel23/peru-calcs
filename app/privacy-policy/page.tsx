import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Política de privacidad | PeruCalcs",
  description:
    "Información sobre privacidad, cookies, uso de datos y publicidad en PeruCalcs. Tus cálculos no sustituyen asesoría profesional.",
};

export default function PrivacyPolicyPage() {
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
                Política de privacidad
              </span>
            </nav>

            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Política de privacidad
              </h1>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Última actualización: 2026
              </p>

              <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <section aria-labelledby="privacidad-intro">
                  <h2
                    id="privacidad-intro"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    Resumen
                  </h2>
                  <p className="mt-3">
                    En PeruCalcs nos importa tu tranquilidad. Esta página resume,
                    en lenguaje sencillo, cómo tratamos información cuando usas el
                    sitio. Los textos pueden actualizarse con el tiempo; la fecha de
                    arriba indica la última revisión.
                  </p>
                </section>

                <section aria-labelledby="privacidad-uso-contenido">
                  <h2
                    id="privacidad-uso-contenido"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    Uso del sitio y datos que ingresas
                  </h2>
                  <p className="mt-3">
                    Las herramientas de PeruCalcs (IGV, porcentajes, descuentos,
                    tipo de cambio, entre otras) funcionan principalmente en tu
                    navegador.{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      No almacenamos datos sensibles de tus finanzas
                    </strong>
                    —como montos ingresados, resultados o contraseñas— en nuestros
                    servidores, porque el sitio no requiere que inicies sesión ni
                    envía esos valores a un backend para guardarlos.
                  </p>
                  <p className="mt-3">
                    Los tipos de cambio que ves u obtienes con la calculadora son{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      solo informativos
                    </strong>
                    , según los valores que tú configures. Debes contrastarlos con
                    fuentes oficiales o mercado antes de decidir algo importante.
                  </p>
                </section>

                <section aria-labelledby="privacidad-cookies-publicidad">
                  <h2
                    id="privacidad-cookies-publicidad"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    Cookies, analíticas y publicidad
                  </h2>
                  <p className="mt-3">
                    En el futuro, PeruCalcs podría incorporar tecnologías que usen{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      cookies
                    </strong>{" "}
                    u otras técnicas similares para recordar preferencias del
                    navegador, medir el uso del sitio o mostrar anuncios. En
                    particular, podría ofrecerse integración con servicios como{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      Google AdSense
                    </strong>
                    .
                  </p>
                  <p className="mt-3">
                    Esos proveedores pueden usar cookies o identificadores para
                    ofrecer anuncios personalizados, limitar fraudes y generar{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      estadísticas de uso anónimas o agregadas
                    </strong>
                    . No controlamos todos los procesos internos de terceros; te
                    recomendamos leer también sus políticas de privacidad.
                  </p>
                  <p className="mt-3">
                    Las integraciones de{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      analítica o publicidad
                    </strong>{" "}
                    podrían añadirse sin aviso previo puntual en una nota destacada:
                    cuando estén activas, actualizaremos esta página o el aviso legal
                    del sitio para reflejarlo con claridad.
                  </p>
                </section>

                <section aria-labelledby="privacidad-terceros">
                  <h2
                    id="privacidad-terceros"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    Servicios de terceros
                  </h2>
                  <p className="mt-3">
                    Partes del sitio pueden cargar contenido desde redes de
                    alojamiento, fuentes tipográficas, medición de audiencia u otros
                    servicios externos. Esos socios pueden recopilar datos{" "}
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      técnicos y de uso
                    </strong>{" "}
                    (por ejemplo tipo de navegador, idioma o páginas visitadas),
                    habitualmente sin identificar a una persona por nombre salvo que
                    tú mismo inicies sesión en el servicio de terceros.
                  </p>
                </section>

                <section aria-labelledby="privacidad-cambios">
                  <h2
                    id="privacidad-cambios"
                    className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                    Cambios y contacto
                  </h2>
                  <p className="mt-3">
                    Podemos mejorar estas explicaciones para alinearlas con nuevas
                    funciones del sitio o requisitos legales. Si tienes preguntas
                    sobre privacidad, puedes usar la página de{" "}
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
