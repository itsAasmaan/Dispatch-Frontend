import { forwardRef } from "react";
import { cn } from "../../utils/helpers";

const Input = forwardRef(
  ({ label, error, hint, icon, rightIcon, className = "", containerClass = "", required = false, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1.5", containerClass)}>
        {label && (
          <label className="text-sm font-medium text-dark-200">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500">{icon}</div>}
          <input
            ref={ref}
            className={cn(
              "input-base",
              icon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500/50 focus:ring-red-500",
              className,
            )}
            {...props}
          />

          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500">{rightIcon}</div>}
        </div>
        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
        {hint && !error && <p className="text-xs text-dark-500">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
