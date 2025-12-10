// import Footer from "@/components/layout/footer";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <section className="min-h-screen">{children}</section>;
}
