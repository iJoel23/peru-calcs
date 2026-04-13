const FAQ_ITEMS = [
  {
    question: "¿Qué es el IGV en Perú?",
    answer:
      "El IGV (Impuesto General a las Ventas) es un impuesto indirecto del 18% que grava el consumo de bienes y servicios. En muchos casos se muestra separado del precio base o ya incluido en el total según el tipo de operación.",
  },
  {
    question: "¿Cómo se calcula el IGV al 18%?",
    answer:
      "Para obtener el IGV sobre una base imponible, multiplicas el monto por 0.18. Para llevar un monto sin IGV a uno con IGV incluido, multiplicas por 1.18. Para extraer la base desde un total con IGV, divides entre 1.18.",
  },
  {
    question: "¿Esta calculadora reemplaza asesoría fiscal?",
    answer:
      "No. Es una herramienta orientativa para cálculos rápidos con la tasa general del 18%. Los casos reales pueden tener excepciones, detracciones u otras normas; consulta a un contador o a SUNAT para tu situación específica.",
  },
] as const;

export function Faq() {
  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
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
  );
}
