"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default function GlobalProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
