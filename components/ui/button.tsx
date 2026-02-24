import * as React from "react";
import clsx from "clsx";

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
      className={clsx(
        "inline-flex items-center justify-center gap-2",
        "px-4 py-2",
        "leading-none", 
        "cursor-pointer hover:opacity-90 disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex items-center justify-center shrink-0">
          {icon}
        </span>
      )}

      <span className="flex items-center">{children}</span>

      {icon && iconPosition === "right" && (
        <span className="flex items-center justify-center shrink-0">
          {icon}
        </span>
      )}
    </button>
  );
}
