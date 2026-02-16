"use client";

import { TanstackProvider } from "@/lib/query/tanstack-provider";
import { ThemeProvider } from "next-themes";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TanstackProvider>{children}</TanstackProvider>
      </ThemeProvider>
  );
}
