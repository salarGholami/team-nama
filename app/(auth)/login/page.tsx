import LoginForm from "@/components/forms/login-form";
import { Check, KeySquare, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="max-w-7xl mx-auto flex mt-32">
      <div className="grid grid-cols-12 gap-8 mx-2 md:mx-8 w-full">
        <div className="col-span-12 md:col-span-12 lg:col-span-4">
          <LoginForm />
        </div>

        <div className="hidden lg:grid lg:col-span-8 gap-4">
          <DemoAccount />
          <SystemFeatures />
        </div>
      </div>
    </div>
  );
}

function DemoAccount() {
  return (
    <div className="border overflow-hidden shadow-2xl rounded-xl p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl">حساب‌های آزمایشی</span>
        <span className="text-primary-400">
          برای تست سیستم می‌توانید از حساب‌های زیر استفاده کنید :
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-primary-800 flex flex-col w-full rounded-xl overflow-hidden">
          <span className="gradient-text text-lg font-semibold px-4">مدیر</span>
          <div className="w-full bg-primary-700 flex flex-col items-end px-4 py-1">
            <span className="flex gap-2">
              <span className="font-semibold">admin@techcompany.com</span>
              <span className="flex justify-center items-center">
                <Mail className="w-4 h-4 " />
              </span>
            </span>
            <span className="flex gap-2">
              <span className="font-semibold">admin123</span>
              <span className="flex justify-center items-center">
                <KeySquare className="w-4 h-4" />
              </span>
            </span>
          </div>
        </div>

        <div className="bg-primary-800 flex flex-col w-full rounded-xl overflow-hidden">
          <span className="gradient-text text-lg font-semibold px-4">مدیر</span>
          <div className="w-full bg-primary-700 flex flex-col items-end px-4 py-1">
            <span className="flex gap-2">
              <span className="font-semibold">admin@techcompany.com</span>
              <span className="flex justify-center items-center">
                <Mail className="w-4 h-4 " />
              </span>
            </span>
            <span className="flex gap-2">
              <span className="font-semibold">admin123</span>
              <span className="flex justify-center items-center">
                <KeySquare className="w-4 h-4" />
              </span>
            </span>
          </div>
        </div>

        <div className="bg-primary-800 flex flex-col w-full rounded-xl overflow-hidden">
          <span className="gradient-text text-lg font-semibold px-4">مدیر</span>
          <div className="w-full bg-primary-700 flex flex-col items-end px-4 py-1">
            <span className="flex gap-2">
              <span className="font-semibold">admin@techcompany.com</span>
              <span className="flex justify-center items-center">
                <Mail className="w-4 h-4 " />
              </span>
            </span>
            <span className="flex gap-2">
              <span className="font-semibold">admin123</span>
              <span className="flex justify-center items-center">
                <KeySquare className="w-4 h-4" />
              </span>
            </span>
          </div>
        </div>

        <div className="bg-primary-800 flex flex-col w-full rounded-xl overflow-hidden">
          <span className="gradient-text text-lg font-semibold px-4">مدیر</span>
          <div className="w-full bg-primary-700 flex flex-col items-end px-4 py-1">
            <span className="flex gap-2">
              <span className="font-semibold">admin@techcompany.com</span>
              <span className="flex justify-center items-center">
                <Mail className="w-4 h-4 " />
              </span>
            </span>
            <span className="flex gap-2">
              <span className="font-semibold">admin123</span>
              <span className="flex justify-center items-center">
                <KeySquare className="w-4 h-4" />
              </span>
            </span>
          </div>
        </div>

        <div className="bg-primary-800 flex flex-col w-full rounded-xl overflow-hidden">
          <span className="gradient-text text-lg font-semibold px-4">مدیر</span>
          <div className="w-full bg-primary-700 flex flex-col items-end px-4 py-1">
            <span className="flex gap-2">
              <span className="font-semibold">admin@techcompany.com</span>
              <span className="flex justify-center items-center">
                <Mail className="w-4 h-4 " />
              </span>
            </span>
            <span className="flex gap-2">
              <span className="font-semibold">admin123</span>
              <span className="flex justify-center items-center">
                <KeySquare className="w-4 h-4" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemFeatures() {
  return (
    <div className="border flex flex-col gap-2 p-4 rounded-xl gradient-bg-glasses">
      <span className="text-3xl">ویژگی‌های سیستم</span>

      <div className="flex flex-col justify-between gap-2 mt-2">
        <div className="flex items-center gap-2">
          <span>
            <Check className="gradient-bg w-6 h-6 rounded-full p-1 text-white" />
          </span>
          <span className="font-sans">داشبورد اختصاصی برای هر نقش</span>
        </div>

        <div className="flex items-center gap-2">
          <span>
            <Check className="gradient-bg w-6 h-6 rounded-full p-1 text-white" />
          </span>
          <span className="font-sans">داشبورد اختصاصی برای هر نقش</span>
        </div>

        <div className="flex items-center gap-2">
          <span>
            <Check className="gradient-bg w-6 h-6 rounded-full p-1 text-white" />
          </span>
          <span className="font-sans">داشبورد اختصاصی برای هر نقش</span>
        </div>

        <div className="flex items-center gap-2">
          <span>
            <Check className="gradient-bg w-6 h-6 rounded-full p-1 text-white" />
          </span>
          <span className="font-sans">داشبورد اختصاصی برای هر نقش</span>
        </div>
      </div>
    </div>
  );
}
