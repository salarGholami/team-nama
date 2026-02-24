"use client";

import { useRef } from "react";
import LoginForm, { LoginFormHandle } from "@/components/forms/login-form";
import db from "@/data/db.json";
import { Mail, KeySquare, Check } from "lucide-react";

/* =========================
   Demo Accounts Normalize
========================= */

const demoAccounts = Array.from(
  new Map(db.users.map((u) => [`${u.id}-${u.roleId}`, u])).values(),
)
  .slice(0, 6) // 
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
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-12">
        {/* FORM */}
        <div className="lg:col-span-4 lg:pt-20">
          <LoginForm ref={formRef} />
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-8 space-y-8 ">
          <DemoAccounts accounts={demoAccounts} formRef={formRef} />

          <div className="hidden lg:block">
            <SystemFeatures features={systemFeatures} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================
   Demo Accounts
========================= */

function DemoAccounts({
  accounts,
  formRef,
}: {
  accounts: typeof demoAccounts;
  formRef: React.RefObject<LoginFormHandle | null>;
}) {
  return (
    <section className="rounded-2xl border border-primary-800/60 bg-primary-900/60 backdrop-blur-xl shadow-xl">
      <header className="px-6 pt-6 pb-2">
        <h2 className="text-xl lg:text-2xl font-semibold">حساب‌های آزمایشی</h2>
        <p className="text-sm text-primary-400 mt-1">
          برای ورود سریع روی یکی از حساب‌ها کلیک کنید
        </p>
      </header>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accounts.map((acc) => (
          <button
            key={`${acc.id}-${acc.role}`}
            onClick={() => formRef.current?.quickLogin(acc.email, acc.password)}
            className="rounded-xl border border-primary-800 bg-primary-800/60 p-4 text-right transition hover:border-primary-600 hover:bg-primary-800"
          >
            <h3 className="font-semibold text-primary-100">{acc.label}</h3>

            <div className="mt-3 space-y-2 text-sm">
              <Row icon={<Mail className="w-4 h-4" />} value={acc.email} />
              <Row
                icon={<KeySquare className="w-4 h-4" />}
                value={acc.password}
              />
            </div>
          </button>
        ))}
      </div>
    </section>
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

/* =========================
   System Features
========================= */

function SystemFeatures({ features }: { features: string[] }) {
  return (
    <section className="rounded-2xl border border-primary-800/60 bg-primary-900/60 backdrop-blur-xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">ویژگی‌های سیستم</h2>

      <ul className="space-y-4">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 mt-0.5 text-primary-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
