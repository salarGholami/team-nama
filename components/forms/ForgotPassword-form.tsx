"use client";

import { Mail, KeyRound } from "lucide-react";
import { Button } from "../ui/button";

export default function ForgotPasswordForm() {
  return (
    <form className="overflow-hidden w-full flex justify-center items-center backdrop-blur-xs bg-primary-900/50 mx-4">
      <div className="flex flex-col w-full p-4 gap-4 border rounded-xl shadow-2xl">
        {/* title */}
        <div className="flex w-full flex-col gap-4">
          <span className="flex items-center gap-4">
            <KeyRound className="gradient-bg w-10 h-10 p-1 rounded-xl text-white" />
            <span className="text-3xl">فراموشی رمز</span>
          </span>
          <span className="text-primary-400">
            ایمیلی که باهاش ثبت‌نام کردید رو وارد کن
          </span>
        </div>

        {/* field */}
        <div className="flex flex-col w-full gap-2 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">ایمیل</label>
            <input
              id="email"
              type="email"
              placeholder="ایمیل را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4 outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </div>

        <Button
          className="btn font-semibold rounded-md mt-4"
          icon={<Mail size={20} />}
        >
          ارسال لینک بازیابی
        </Button>
      </div>
    </form>
  );
}
