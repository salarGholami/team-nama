// components/forms/login-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, UserLock } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type DemoAccount = {
  role: string;
  label: string;
  email: string;
  password: string;
};

type LoginFormProps = {
  demoAccounts: DemoAccount[];
};

export default function LoginForm({ demoAccounts }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const account = demoAccounts.find(
      (acc) => acc.email === email.trim() && acc.password === password
    );

    if (!account) {
      alert("ایمیل یا رمز عبور اشتباه است");
      setLoading(false);
      return;
    }

    // ست کردن توکن با نقش
    const tokenPayload = { role: account.role };
    const token = btoa(JSON.stringify(tokenPayload));
    document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;

    // مستقیم به داشبورد برو
    router.push("/dashboard");
    router.refresh();
  };

  // ورود سریع از دمو اکانت‌ها
  const quickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setTimeout(() => handleLogin(new Event("submit") as any), 100);
  };

  (LoginForm as any).quickLogin = quickLogin;

  return (
    <form
      onSubmit={handleLogin}
      className="overflow-hidden w-full flex justify-center items-center"
    >
      <div className="flex flex-col w-full p-4 gap-4 border rounded-xl shadow-2xl">
        {/* عنوان */}
        <div className="flex w-full">
          <div className="flex flex-col">
            <span className="flex flex-col gap-4">
              <span className="flex justify-center items-center gap-4">
                <UserLock className="gradient-bg w-10 h-10 p-1 rounded-xl text-white" />
                <span className="text-3xl">ورود به سیستم</span>
              </span>
              <span className="text-primary-400">به پنل مدیریت خوش آمدید</span>
            </span>
          </div>
        </div>

        {/* ایمیل و رمز */}
        <div className="flex flex-col w-full gap-2">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email">ایمیل</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password">رمز</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
              required
            />
          </div>
        </div>

        {/* فراموشی رمز و یادآوری */}
        <div className="flex justify-between">
          <div className="text-sm">
            <Link href="/forgot-password">فراموشی رمز عبور؟</Link>
          </div>
          <div className="text-sm text-primary-400">
            <div className="gap-2 flex">
              <label htmlFor="remember-me">مرا بخاطر بسپار</label>
              <input type="checkbox" name="remember-me" id="remember-me" />
            </div>
          </div>
        </div>

        {/* دکمه ورود */}
        <Button
          type="submit"
          disabled={loading}
          className="btn font-semibold rounded-md"
          icon={<LogIn size={20} />}
        >
          {loading ? "در حال ورود..." : "ورود به سیستم"}
        </Button>

        {/* ثبت نام */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-primary-400">حساب کاربری ندارید؟</span>
          <Link href="/register">ثبت نام کنید</Link>
        </div>
      </div>
    </form>
  );
}
