"use client";

<<<<<<< HEAD
// components/forms/login-form.tsx
export default function LoginForm() {
  return (
    <form className="overflow-hidden w-full flex justify-center items-center">
      <div className="flex flex-col w-full p-4 gap-4 border rounded-xl shadow-2xl">
        {/* title */}
        <div className="flex w-full">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-4 text-3xl">
                <Code className="gradient-bg w-10 h-10 p-1 rounded-xl text-white" />
                <span> ورود به سیستم</span>
              </span>
              <span className="text-primary-400">به پنل مدیریت خوش امدید</span>
            </div>
          </div>
=======
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "../ui/button";
import InputField from "../ui/input-field";
import { Loader2, LogIn } from "lucide-react";

export type LoginFormHandle = {
  quickLogin: (email: string, password: string) => void;
};

type LoginFormProps = {
  className?: string;
};

const LoginForm = forwardRef<LoginFormHandle, LoginFormProps>(
  ({ className }, ref) => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement | null>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok || !data?.success) {
          setError(data?.error ?? "Authentication failed");
          setLoading(false);
          return;
        }

        router.push("/dashboard");
        router.refresh();
      } catch {
        setError("Unexpected server error");
        setLoading(false);
      }
    }

    function quickLogin(email: string, password: string) {
      setEmail(email);
      setPassword(password);

      requestAnimationFrame(() => {
        formRef.current?.requestSubmit();
      });
    }

    useImperativeHandle(ref, () => ({ quickLogin }));

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={clsx(
          "space-y-6 rounded-2xl border border-primary-800/60",
          "bg-primary-900/70 backdrop-blur-xl shadow-2xl",
          "p-8 w-full max-w-sm",
          className,
        )}
      >
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight pb-2">
            ورود به حساب
          </h1>
          <p className="text-sm text-primary-400">
            اطلاعات ورود خود را وارد کنید
          </p>
        </header>

        {/* Inputs */}
        <div className="space-y-4">
          <InputField
            label="ایمیل"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            label="رمز عبور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
>>>>>>> feature/dashboard-ui
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          icon={
            loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogIn className="size-4" />
            )
          }
          iconPosition="right"
          className="w-full rounded-lg py-2.5 font-medium btn"
        >
          <span className="inline-flex items-center">
            {loading ? "در حال ورود..." : "ورود"}
          </span>
        </Button>
      </form>
    );
  },
);

LoginForm.displayName = "LoginForm";

export default LoginForm;
