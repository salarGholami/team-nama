// app/layout.tsx
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import Navbar from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
