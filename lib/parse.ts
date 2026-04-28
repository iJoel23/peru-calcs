/**
 * Shared decimal input parsing for calculator forms.
 * Accepts comma or dot as decimal separator.
 */

export type ParseNonNegativeError = "empty" | "invalid" | "negative";

export type ParseNonNegativeResult =
  | { ok: true; value: number }
  | { ok: false; error: ParseNonNegativeError };

export type ParseStrictPositiveError =
  | ParseNonNegativeError
  | "zero";

export type ParseStrictPositiveResult =
  | { ok: true; value: number }
  | { ok: false; error: ParseStrictPositiveError };

function parseNumberFromRaw(raw: string): ParseNonNegativeResult {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return { ok: false, error: "empty" };
  }

  const normalized = trimmed.replace(/\s/g, "").replace(",", ".");
  const value = Number(normalized);

  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return { ok: false, error: "invalid" };
  }

  if (value < 0) {
    return { ok: false, error: "negative" };
  }

  return { ok: true, value };
}

/** Allows zero (e.g. IGV base, percentages, discounts). */
export function parseNonNegativeAmount(raw: string): ParseNonNegativeResult {
  return parseNumberFromRaw(raw);
}

/** Requires a value strictly greater than zero (e.g. exchange amounts and rate). */
export function parseStrictPositiveAmount(
  raw: string,
): ParseStrictPositiveResult {
  const parsed = parseNumberFromRaw(raw);
  if (!parsed.ok) {
    return parsed;
  }
  if (parsed.value === 0) {
    return { ok: false, error: "zero" };
  }
  return parsed;
}
