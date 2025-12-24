// components/ui/button.tsx
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export function Button({
  children,
  icon,
  iconPosition = "right",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center py-2 px-4 gap-2 cursor-pointer hover:opacity-90 disabled:opacity-50 ${className}`.trim()}
      {...props}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
