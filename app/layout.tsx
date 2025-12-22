// app/layout.tsx
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "نام سیستم شما",
  description: "توضیح مختصر سیستم",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}
      >
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
