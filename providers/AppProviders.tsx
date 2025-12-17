"use client";

import { AuthProvider } from "@/context/AuthContext";
import { TanstackProvider } from "@/lib/query/tanstack-provider";
import { ThemeProvider } from "next-themes";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* این next-themes هست */}
        <TanstackProvider>{children}</TanstackProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
