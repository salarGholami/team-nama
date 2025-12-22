import Link from "next/link";
import { Button } from "../ui/button";
import { Code, UserPlus } from "lucide-react";

// components/forms/register-form.tsx
export default function RegisterForm() {
  return (
    <form className="min-h-screen flex flex-col justify-center items-center  px-4 sm:px-6 lg:px-8 lg:pt-28 lg:pb-20">
      <div className="flex flex-col w-full p-4 gap-4 border rounded-xl shadow-2xl max-w-md">
        {/* title */}
        <div className="flex w-full">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-4 text-3xl">
                <Code className="gradient-bg w-10 h-10 p-1 rounded-xl text-white" />
                <span>ثبت نام</span>
              </span>
              <span className="text-primary-400">حساب کاربری جدید بسازید</span>
            </div>
          </div>
        </div>

        {/* email */}
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="name">نام و نام خانوادگی</label>
            <input
              id="name"
              type="text"
              placeholder="نام و نام خانوادگی را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email">ایمیل</label>
            <input
              id="email"
              type="email"
              placeholder="ایمیل را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password">رمز عبور</label>
            <input
              id="password"
              type="password"
              placeholder="رمز عبور را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="repetition">تکرار رمز عبور</label>
            <input
              id="repetition"
              type="password"
              placeholder="تکرار رمز عبور را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>

          {/* btn */}

          <Button
            icon={<UserPlus size={18} />}
            className="border btn flex justify-center items-center mt-4"
          >
            ثبت نام
          </Button>
        </div>

        {/* new register */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-primary-400">حساب کاربری دارید ؟!</span>
          <Link href="/login">وارد شوید</Link>
        </div>
      </div>
    </form>
  );
}
