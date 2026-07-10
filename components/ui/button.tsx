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
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 leading-none transition",
        "cursor-pointer hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex shrink-0 items-center justify-center">
          {icon}
        </span>
      )}

      <span className="flex items-center">{children}</span>

      {icon && iconPosition === "right" && (
        <span className="flex shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
    </button>
  );
}
