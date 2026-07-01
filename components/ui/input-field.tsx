<<<<<<< HEAD
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function InputField({
  label,
  error,
  helperText,
  className = "",
  ...props
}: InputFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
          error ? "border-red-500" : ""
        } ${className}`.trim()}
        {...props}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-gray-400 text-sm mt-1">{helperText}</p>}
    </div>
  );
}
=======
"use client";

import { forwardRef, InputHTMLAttributes, useId, useState } from "react";
import clsx from "clsx";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type = "text", className, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const isEmail = type === "email";

    const resolvedType = isPassword && showPassword ? "text" : type;

    return (
      <label htmlFor={id} className="block space-y-2">
        <span className="text-sm text-primary-300">{label}</span>

        <div className="relative pt-2">
          <input
            ref={ref}
            id={id}
            type={resolvedType}
            className={clsx(
              "w-full rounded-lg border border-primary-700 text-left",
              "bg-primary-800/50 text-sm",
              "px-3 py-2 ", // space for icon
              "focus:outline-none focus:ring-2 focus:ring-primary-500",
              "transition",
              className,
            )}
            {...props}
          />

          {/* RIGHT ICON */}
          <div className="absolute inset-y-0 right-3 flex items-center">
            {/* EMAIL */}
            {isEmail && (
              <Mail className="size-4 text-primary-400 pointer-events-none" />
            )}

            {/* PASSWORD */}
            {isPassword && (
              <div className="flex items-center gap-1">
                <Lock className="size-4 text-primary-400" />

                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-primary-400 hover:text-primary-200 transition"
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
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
>>>>>>> feature/dashboard-ui
