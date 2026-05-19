import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { calculatorFormCardClassName } from "@/components/calculator-ui";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contacto | PeruCalcs",
  description:
    "Contacta con PeruCalcs por consultas sobre las calculadoras, el sitio web o suscripciones a futuras funciones.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 dark:bg-slate-950">
      <SiteHeader />

      <main id="contenido-principal" className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col gap-10 md:gap-12">
            <section aria-labelledby="contact-heading">
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
                    Contacto
                  </span>
                </nav>
                <h1
                  id="contact-heading"
                  className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
                >
                  Contacto
                </h1>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                  ¿Comentarios, sugerencias o dudas? Escríbenos cuando quieras.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="contact-email-heading"
              className="mx-auto w-full max-w-lg"
            >
              <div className={`${calculatorFormCardClassName} text-center`}>
                <h2
                  id="contact-email-heading"
                  className="text-base font-semibold text-slate-900 dark:text-white"
                >
                  Correo
                </h2>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Para consultas generales puedes usar:
                </p>
                <p className="mt-2">
                  <a
                    href="mailto:contact@perucalcs.com"
                    className="text-lg font-semibold text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
                  >
                    contact@perucalcs.com
                  </a>
                </p>
              </div>
            </section>

            <section
              aria-labelledby="contact-form-heading"
              className="mx-auto w-full max-w-lg"
            >
              <h2
                id="contact-form-heading"
                className="mb-6 text-center text-lg font-semibold tracking-tight text-slate-900 dark:text-white"
              >
                Formulario de contacto
              </h2>
              <ContactForm />
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
