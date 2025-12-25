"use client";

import { UserLock, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Select from "../ui/Select";

export default function RegisterForm() {
  return (
    <form className="overflow-hidden w-full flex justify-center items-center backdrop-blur-xs bg-primary-900/50 mx-4">
      <div className="flex flex-col w-full p-4 gap-4 border rounded-xl shadow-2xl">
        {/* title */}
        <div className="flex w-full flex-col gap-4">
          <span className="flex items-center gap-4">
            <UserLock  className="gradient-bg w-10 h-10 p-1 rounded-xl text-white" />
            <span className="text-3xl">ثبت‌نام</span>
          </span>
          <span className="text-primary-400">حساب کاربری جدید بسازید</span>
        </div>

        {/* form fields */}
        <div className="flex flex-col w-full gap-2 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">نام و نام خانوادگی</label>
            <input
              id="name"
              type="text"
              placeholder="نام و نام خانوادگی را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">ایمیل</label>
            <input
              id="email"
              type="email"
              placeholder="ایمیل را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>

          {/* role select */}
          <div className="flex flex-col gap-2">
            <Select
              label="نقش"
              value=""
              onChange={() => {}}
              options={[{ label: "مشتری", value: "Client" }]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">رمز</label>
            <input
              id="password"
              type="password"
              placeholder="رمز را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="repeatPassword">تکرار رمز</label>
            <input
              id="repeatPassword"
              type="password"
              placeholder="تکرار رمز را وارد کن"
              className="bg-primary-700 rounded-md py-2 px-4"
            />
          </div>
        </div>

        <Button
          className="btn font-semibold rounded-md  mt-4"
          icon={<UserPlus size={20} />}
        >
          ثبت نام
        </Button>

        <div className="flex justify-center items-center gap-2">
          <span className="text-primary-400">حساب کاربری دارید؟</span>
          <Link href="/login">وارد شوید</Link>
        </div>
      </div>
    </form>
  );
}
