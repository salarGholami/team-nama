"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { useRouter } from "next/navigation";

export type LoginFormHandle = {
  quickLogin: (email: string, password: string) => void;
};

type LoginFormProps = {};

const LoginForm = forwardRef<LoginFormHandle, LoginFormProps>((props, ref) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Server error");
      setLoading(false);
    }
  };

  const quickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setTimeout(() => {
      const form = document.querySelector("form") as HTMLFormElement | null;
      form?.requestSubmit();
    }, 50);
  };

  useImperativeHandle(ref, () => ({
    quickLogin,
  }));

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 p-6 w-80 bg-primary-900 rounded-xl"
    >
      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-primary-700 px-4 py-2 rounded-md"
        required
      />
      <input
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-primary-700 px-4 py-2 rounded-md"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary-600 hover:bg-primary-500 py-2 rounded-md"
      >
        {loading ? "در حال ورود..." : "ورود"}
      </button>
    </form>
  );
});

// ✅ حتما displayName ست شود
LoginForm.displayName = "LoginForm";

export default LoginForm;
