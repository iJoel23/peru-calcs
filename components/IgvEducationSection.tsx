export function IgvEducationSection() {
  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8"
      aria-labelledby="igv-education-heading"
    >
      <h2
        id="igv-education-heading"
        className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
      >
        ¿Cómo calcular el IGV en Perú?
      </h2>

      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          El{" "}
          <strong className="font-semibold text-slate-900 dark:text-white">
            IGV
          </strong>{" "}
          (Impuesto General a las Ventas) es un impuesto al consumo que en la
          mayoría de operaciones cotidianas aplica la{" "}
          <strong className="font-semibold text-slate-900 dark:text-white">
            tasa general del 18%
          </strong>{" "}
          sobre el precio o la base imponible.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Sumar o restar el IGV en montos
        </h3>
        <p>
          Para <strong className="font-medium">agregar IGV</strong> a un monto
          sin impuesto, se multiplica la base por{" "}
          <span className="font-mono text-slate-800 dark:text-slate-200">
            1,18
          </span>{" "}
          y el IGV es la diferencia respecto a esa base. Para{" "}
          <strong className="font-medium">quitar IGV</strong> de un total que
          ya lo incluye, se divide entre{" "}
          <span className="font-mono text-slate-800 dark:text-slate-200">
            1,18
          </span>{" "}
          para obtener la base; el IGV es lo que queda hasta el total.
        </p>

        <p>
          Si ya tienes la base y solo necesitas el impuesto, puedes{" "}
          <strong className="font-medium">calcular el IGV</strong> multiplicando
          el monto por{" "}
          <span className="font-mono text-slate-800 dark:text-slate-200">
            0,18
          </span>{" "}
          y sumarlo para llegar al total con IGV.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          ¿Para quién es útil esta calculadora?
        </h3>
        <p>
          Sirve a <strong className="font-medium">emprendedores</strong>,{" "}
          <strong className="font-medium">freelancers</strong> y{" "}
          <strong className="font-medium">
            personas que cotizan o revisan montos
          </strong>{" "}
          en soles cuando necesitan pasar rápidamente entre
          precio sin IGV, IGV y total — siempre como apoyo numérico, no como
          asesoría tributaria formal.
        </p>
      </div>
    </section>
  );
}
