"use client";

import { forwardRef, InputHTMLAttributes, useId, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type = "text", className, error, helperText, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const isEmail = type === "email";
    const resolvedType = isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full">
        <label htmlFor={id} className="block space-y-2">
          <span className="text-sm text-primary-300">{label}</span>

          <div className="relative pt-2">
            <input
              ref={ref}
              id={id}
              type={resolvedType}
              className={clsx(
                "w-full rounded-lg border border-primary-700 bg-primary-800/50 px-3 py-2 text-sm text-left text-primary-100",
                "transition focus:outline-none focus:ring-2 focus:ring-primary-500",
                error ? "border-red-500" : "",
                className,
              )}
              {...props}
            />

            <div className="absolute inset-y-0 right-3 flex items-center">
              {isEmail && (
                <Mail className="pointer-events-none size-4 text-primary-400" />
              )}

              {isPassword && (
                <div className="flex items-center gap-1">
                  <Lock className="size-4 text-primary-400" />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-primary-400 transition hover:text-primary-200"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </label>

        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        {helperText && (
          <p className="mt-1 text-sm text-primary-400">{helperText}</p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
