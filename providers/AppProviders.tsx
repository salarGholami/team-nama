// providers/AppProviders.tsx
"use client";

import { AuthProvider } from "@/context/AuthContext";
import ThemeProvider from "@/providers/ThemeProvider"; // ← این از next-themes
import { TanstackProvider } from "@/lib/query/tanstack-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {" "}
        {/* این next-themes هست */}
        <TanstackProvider>{children}</TanstackProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
