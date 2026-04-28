"use client";

import { useCallback, useState } from "react";

export type CalculatorCopyState = "idle" | "copying" | "done";

export function useCalculatorCopy() {
  const [copyState, setCopyState] = useState<CalculatorCopyState>("idle");

  const copy = useCallback(async (text: string) => {
    setCopyState("copying");
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("done");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("idle");
    }
  }, []);

  return { copyState, copy };
}
