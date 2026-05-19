"use client";

import { useMemo, useState } from "react";
import {
  calculatorCopyButtonClassName,
  calculatorErrorClassName,
  calculatorFormCardClassName,
  calculatorLabelClassName,
} from "@/components/calculator-ui";

const fieldClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400";

function looksLikeEmail(value: string): boolean {
  const v = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [touchedSubmit, setTouchedSubmit] = useState(false);

  const errors = useMemo((): FieldErrors => {
    if (!touchedSubmit) return {};
    const next: FieldErrors = {};
    if (name.trim() === "") {
      next.name = "Ingresa tu nombre.";
    }
    const em = email.trim();
    if (em === "") {
      next.email = "Ingresa tu correo.";
    } else if (!looksLikeEmail(em)) {
      next.email = "Ingresa un correo válido.";
    }
    if (message.trim() === "") {
      next.message = "Escribe un mensaje.";
    }
    return next;
  }, [name, email, message, touchedSubmit]);

  const hasBlockingErrors =
    touchedSubmit && Boolean(errors.name || errors.email || errors.message);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouchedSubmit(true);

    const nextErrors: FieldErrors = {};
    if (name.trim() === "") nextErrors.name = "Ingresa tu nombre.";
    const em = email.trim();
    if (em === "") nextErrors.email = "Ingresa tu correo.";
    else if (!looksLikeEmail(em)) nextErrors.email = "Ingresa un correo válido.";
    if (message.trim() === "") nextErrors.message = "Escribe un mensaje.";

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className={`${calculatorFormCardClassName} mx-auto max-w-lg`}
        role="status"
        aria-live="polite"
      >
        <p className="text-center text-base leading-relaxed text-slate-800 dark:text-slate-100">
          Gracias por contactarnos. Te responderemos pronto.
        </p>
      </div>
    );
  }

  const formErrorsId = "contact-form-errors";

  return (
    <form
      className={`${calculatorFormCardClassName} mx-auto max-w-lg space-y-6`}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={hasBlockingErrors ? formErrorsId : undefined}
    >
      {hasBlockingErrors && (
        <div id={formErrorsId} className={calculatorErrorClassName} role="alert">
          <p className="font-medium">Revisa los siguientes datos:</p>
          <ul className="mt-2 list-inside list-disc text-sm">
            {errors.name && <li>{errors.name}</li>}
            {errors.email && <li>{errors.email}</li>}
            {errors.message && <li>{errors.message}</li>}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className={calculatorLabelClassName}>
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClassName}
          aria-required
          aria-invalid={Boolean(errors.name)}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={calculatorLabelClassName}>
          Correo electrónico
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClassName}
          aria-required
          aria-invalid={Boolean(errors.email)}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={calculatorLabelClassName}>
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClassName} min-h-[120px] resize-y font-sans`}
          aria-required
          aria-invalid={Boolean(errors.message)}
        />
      </div>

      <button
        type="submit"
        className={`${calculatorCopyButtonClassName} mt-0 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-500`}
      >
        Enviar mensaje
      </button>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Este formulario es solo de demostración: no enviamos datos a ningún
        servidor.
      </p>
    </form>
  );
}
