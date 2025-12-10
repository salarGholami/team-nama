"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
