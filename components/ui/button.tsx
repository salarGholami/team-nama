import * as React from "react";
import clsx from "clsx";

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
<<<<<<< HEAD
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-85 ${className}`.trim()}
=======
      className={clsx(
        "inline-flex items-center justify-center gap-2",
        "px-4 py-2",
        "leading-none", 
        "cursor-pointer hover:opacity-90 disabled:opacity-50",
        className,
      )}
>>>>>>> feature/dashboard-ui
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
