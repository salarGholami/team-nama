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
