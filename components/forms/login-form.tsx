import { Code, LogIn, UserLock } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

// components/forms/login-form.tsx
export default function LoginForm() {
  return (
    <form className="overflow-hidden w-full flex justify-center items-center">
      <div className="flex flex-col w-full p-4 gap-4 border rounded-xl shadow-2xl">
        {/* title */}
        <div className="flex w-full">
          <div className="flex flex-col">
            <span className=" flex flex-col gap-4">
              <span className="flex justify-center items-center gap-4">
                <UserLock className="gradient-bg w-10 h-10 p-1 rounded-xl text-white" />
                <span className="text-3xl">ورود به سیستم</span>
              </span>
              <span className="text-primary-400 ">به پنل مدیریت خوش آمدید</span>
            </span>
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col w-full gap-2">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email">ایمیل</label>
            <input
              id="email"
              type="text"
              placeholder="ایمیل را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password">رمز</label>
            <input
              id="password"
              type="password"
              placeholder="رمز را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>
        </div>
        {/* forgot-password */}
        <div className="flex justify-between ">
          <div className="text-sm">
            <Link href="/forgot-password">فراموشی رمز عبور؟</Link>
          </div>
          <div className="text-sm text-primary-400">
            <div className="gap-2 flex">
              <label htmlFor="remeber-me">مرا بخاطر بسپار</label>
              <input type="checkbox" name="remeber-me" id="remeber-me" />
            </div>
          </div>
        </div>
        {/* btn */}
        <Button
          className="btn font-semibold rounded-md"
          icon={<LogIn size={20} />}
        >
          ورود به سیستم
        </Button>
        {/* new register */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-primary-400">حساب کاربری ندارید؟</span>
          <Link href="/register">ثبت نام کنید</Link>
        </div>
      </div>
    </form>
  );
}
