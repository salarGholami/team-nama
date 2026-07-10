"use client";

import { useRef } from "react";
import LoginForm, { type LoginFormHandle } from "@/components/forms/login-form";
import db from "@/data/db.json";
import { Check, KeySquare, Mail } from "lucide-react";

type DemoAccount = {
  id: number;
  role: string;
  label: string;
  email: string;
  password: string;
};

const demoAccounts: DemoAccount[] = Array.from(
  new Map(
    (
      (
        db as {
          users: Array<{
            id: number;
            roleId: string;
            name: string;
            email: string;
            password: string;
          }>;
        }
      ).users || []
    ).map((u) => [`${u.id}-${u.roleId}`, u]),
  ).values(),
)
  .slice(0, 6)
  .map((u) => ({
    id: u.id,
    role: u.roleId,
    label: `${u.roleId} (${u.name})`,
    email: u.email,
    password: u.password,
  }));

const systemFeatures = [
  "داشبورد اختصاصی برای هر نقش کاربری",
  "مدیریت پیشرفته کاربران و سطوح دسترسی",
  "گزارش‌گیری لحظه‌ای و تحلیلی قدرتمند",
  "طراحی ریسپانسیو و بهینه برای تمام دستگاه‌ها",
  "امنیت بالا با احراز هویت دو مرحله‌ای",
  "پشتیبانی کامل از زبان فارسی و تقویم شمسی",
];

export default function LoginPage() {
  const formRef = useRef<LoginFormHandle | null>(null);

  return (
    <main className="px-4 py-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:pt-20">
          <LoginForm ref={formRef} />
        </div>

        <div className="space-y-8 lg:col-span-8">
          <section className="rounded-2xl border border-primary-800/60 bg-primary-900/60 shadow-xl backdrop-blur-xl">
            <header className="px-6 pb-2 pt-6">
              <h2 className="text-xl font-semibold lg:text-2xl">
                حساب‌های آزمایشی
              </h2>
              <p className="mt-1 text-sm text-primary-400">
                برای ورود سریع روی یکی از حساب‌ها کلیک کنید
              </p>
            </header>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              {demoAccounts.map((acc) => (
                <button
                  key={`${acc.id}-${acc.role}`}
                  onClick={() =>
                    formRef.current?.quickLogin(acc.email, acc.password)
                  }
                  className="rounded-xl border border-primary-800 bg-primary-800/60 p-4 text-right transition hover:border-primary-600 hover:bg-primary-800"
                >
                  <h3 className="font-semibold text-primary-100">
                    {acc.label}
                  </h3>
                  <div className="mt-3 space-y-2 text-sm">
                    <Row
                      icon={<Mail className="h-4 w-4" />}
                      value={acc.email}
                    />
                    <Row
                      icon={<KeySquare className="h-4 w-4" />}
                      value={acc.password}
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="hidden lg:block">
            <section className="rounded-2xl border border-primary-800/60 bg-primary-900/60 p-6 shadow-xl backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-semibold">ویژگی‌های سیستم</h2>
              <ul className="space-y-4">
                {systemFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 text-primary-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function Row({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center justify-end gap-2 text-primary-300">
      <span className="font-mono">{value}</span>
      {icon}
    </div>
  );
}
