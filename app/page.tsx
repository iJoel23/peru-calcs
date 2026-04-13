import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ComingSoonSection } from "@/components/ComingSoonSection";
import { Faq } from "@/components/Faq";
import { IgvEducationSection } from "@/components/IgvEducationSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50 dark:bg-slate-950">
      <SiteHeader />

      <main id="contenido-principal" className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col gap-16 md:gap-20">
            <section
              aria-labelledby="calculator-heading"
              className="scroll-mt-8"
            >
              <div className="mx-auto max-w-lg text-center">
                <h1
                  id="calculator-heading"
                  className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
                >
                  Calculadora IGV Perú
                </h1>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                  Calcula IGV fácilmente (18%)
                </p>
              </div>

              <div className="mx-auto mt-8 w-full max-w-lg">
                <AdPlaceholder size="banner" />
              </div>

              <div className="mx-auto mt-10 max-w-lg">
                <CalculatorForm />
              </div>
            </section>

            <IgvEducationSection />

            <Faq />

            <AdPlaceholder size="banner" />

            <ComingSoonSection />

            <AdPlaceholder size="banner" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
