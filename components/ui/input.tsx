import * as React from "react";

type InputProps = React.ComponentProps<"input"> & {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";

  wrapperClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      icon,
      iconPosition = "left",

      wrapperClassName = "",
      inputClassName = "",
      iconClassName = "",

      ...props
    },
    ref,
  ) => {
    return (
      <div className={`relative w-full ${wrapperClassName}`}>
        {icon && (
          <div
            className={`
              pointer-events-none
              absolute top-1/2 -translate-y-1/2
              text-muted-foreground
              ${iconPosition === "left" ? "left-4" : "right-4"}
              ${iconClassName}
            `}
          >
            {icon}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          className={`
            h-11 w-full rounded-xl border border-primary-600/30
            bg-primary-700/30 px-4 text-sm
            placeholder:text-muted-foreground
           focus:outline-none focus:ring-2 focus:ring-primary-500

            ${icon ? (iconPosition === "left" ? "pl-11" : "pr-11") : ""}

            ${inputClassName}
          `}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
