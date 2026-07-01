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

interface DemoAccount {
  role: string;
  email: string;
  password: string;
}

const demoAccounts: DemoAccount[] = [
  { role: "مدیر کل", email: "admin@techcompany.com", password: "admin123" },
  { role: "مدیر فروش", email: "sales@techcompany.com", password: "sales123" },
  { role: "کارمند", email: "employee@techcompany.com", password: "emp123" },
  {
    role: "حسابداری",
    email: "employee@techcompany.com",
    password: "em333p123",
  },
  {
    role: "مشتری نمونه",
    email: "client@techcompany.com",
    password: "client123",
  },
];

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
<<<<<<< HEAD
    <div className="max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8 lg:pt-28 lg:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* فرم ورود - همیشه نمایش داده می‌شود */}
        <div className="lg:col-span-4">
          <LoginForm />
        </div>

        {/* بخش سمت راست - فقط در دسکتاپ */}
        <div className="hidden lg:flex lg:col-span-8 flex-col gap-8">
          <DemoAccountSection accounts={demoAccounts} />
          <SystemFeaturesSection features={systemFeatures} />
=======
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
>>>>>>> feature/dashboard-ui
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

<<<<<<< HEAD
function DemoAccountSection({ accounts }: { accounts: DemoAccount[] }) {
  return (
    <section className="border overflow-hidden shadow-2xl rounded-xl backdrop-blur-sm">
      <div className="p-4">
        <h2 className="text-3xl font-bold">حساب‌های آزمایشی</h2>
        <p className="mt-2 text-primary-400">
          برای تست سیستم می‌توانید از حساب‌های زیر استفاده کنید:
        </p>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accounts.map((account, index) => (
          <DemoAccountCard key={index} {...account} />
        ))}
      </div>
    </section>
  );
}

function DemoAccountCard({ role, email, password }: DemoAccount) {
  return (
    <div className="bg-primary-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
      <div className="px-4 py-1">
        <h3 className="text-base font-semibold gradient-text">{role}</h3>
      </div>

      <div className="bg-primary-700 px-4 py-2 space-y-2 text-right">
        <div className="flex items-center justify-end gap-3">
          <span className="font-mono font-semibold text-sm">{email}</span>
          <Mail className="w-4 h-4 text-primary-200" aria-hidden="true" />
        </div>
        <div className="flex items-center justify-end gap-3">
          <span className="font-mono font-semibold text-sm">{password}</span>
          <KeySquare className="w-4 h-4 text-primary-200" aria-hidden="true" />
        </div>
      </div>
    </div>
=======
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
>>>>>>> feature/dashboard-ui
  );
}

function SystemFeaturesSection({ features }: { features: string[] }) {
  return (
    <section className="border rounded-xl backdrop-blur-sm shadow-xl p-6 gradient-bg-glasses">
      <h2 className="text-3xl font-bold mb-6">ویژگی‌های سیستم</h2>

      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <Check
                className="w-6 h-6 rounded-full p-1 gradient-bg shadow-md text-white"
                aria-hidden="true"
              />
            </div>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
