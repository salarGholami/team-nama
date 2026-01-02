// app/login/page.tsx
"use client";

import LoginForm from "@/components/forms/login-form";
import { Check, KeySquare, Mail } from "lucide-react";
import demoAccounts from "@/data/demo-accounts.json";

const systemFeatures = [
  "داشبورد اختصاصی برای هر نقش کاربری",
  "مدیریت پیشرفته کاربران و سطوح دسترسی",
  "گزارش‌گیری لحظه‌ای و تحلیلی قدرتمند",
  "طراحی ریسپانسیو و بهینه برای تمام دستگاه‌ها",
  "امنیت بالا با احراز هویت دو مرحله‌ای",
  "پشتیبانی کامل از زبان فارسی و تقویم شمسی",
];

export default function LoginPage() {
  return (
    <div className="max-w-7xl mx-auto flex mt-32 mb-8">
      <div className="grid grid-cols-12 gap-8 mx-2 md:mx-8 w-full">
        <div className="col-span-12 md:col-span-12 lg:col-span-4">
          <LoginForm demoAccounts={demoAccounts} />
        </div>

        <div className="hidden lg:grid lg:col-span-8 gap-8">
          <DemoAccountSection accounts={demoAccounts} />
          <SystemFeaturesSection features={systemFeatures} />
        </div>
      </div>
    </div>
  );
}

function DemoAccountSection({ accounts }: { accounts: typeof demoAccounts }) {
  return (
    <section className="border overflow-hidden shadow-2xl rounded-xl backdrop-blur-sm">
      <div className="p-4">
        <h2 className="text-3xl font-bold">حساب‌های آزمایشی</h2>
        <p className="mt-2 text-primary-400">
          برای تست سیستم روی یکی از حساب‌ها کلیک کنید:
        </p>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <button
            key={account.role}
            onClick={() =>
              (LoginForm as any).quickLogin?.(account.email, account.password)
            }
            className="bg-primary-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] text-right p-4 cursor-pointer"
          >
            <h3 className="text-base font-semibold gradient-text">
              {account.label}
            </h3>
            <div className="bg-primary-700 px-4 py-2 mt-2 space-y-2">
              <div className="flex items-center justify-end gap-3">
                <span className="font-mono font-semibold text-sm">
                  {account.email}
                </span>
                <Mail className="w-4 h-4 text-primary-200" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <span className="font-mono font-semibold text-sm">
                  {account.password}
                </span>
                <KeySquare className="w-4 h-4 text-primary-200" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
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
              <Check className="w-6 h-6 rounded-full p-1 gradient-bg shadow-md text-white" />
            </div>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
