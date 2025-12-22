// components/ui/button.tsx
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export function Button({
  children,
  icon,
  iconPosition = "left",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-85 ${className}`.trim()}
      {...props}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
