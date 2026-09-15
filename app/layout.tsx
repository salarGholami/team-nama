import { AppProviders } from "@/providers/AppProviders";
import "../styles/globals.css";

export const metadata = {
  title: "team-nama",
  description: "a mangement system for office",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
