// app/layout.tsx 
import { AppProviders } from "@/providers/AppProviders";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

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
<<<<<<< HEAD
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}
      >
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
=======
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProviders>{children}</AppProviders>
        </ThemeProvider>
>>>>>>> feature/dashboard-ui
      </body>
    </html>
  );
}
