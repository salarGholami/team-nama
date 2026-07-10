import { AppProviders } from "@/providers/AppProviders";
import "../styles/globals.css";

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
      <body className="min-h-screen bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
