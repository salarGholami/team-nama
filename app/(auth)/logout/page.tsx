// app/logout/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // پاک کردن کامل توکن
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

    // رفتن به صفحه اصلی (یا لاگین)
    router.push("/");
    router.refresh(); // برای به‌روزرسانی middleware
  }, [router]);

  // هیچ چیز نشون نده — فقط کارش رو انجام بده
  return null;
}
