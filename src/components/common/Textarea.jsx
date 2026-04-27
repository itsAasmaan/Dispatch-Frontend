import { forwardRef } from "react";
import { cn } from "../../utils/helpers";

const Textarea = forwardRef(
  ({ label, error, hint, className = "", containerClass = "", required = false, rows = 4, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1.5", containerClass)}>
        {label && (
          <label className="text-sm font-medium text-dark-200">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          className={cn("input-base resize-none", error && "border-red-500/50 focus:ring-red-500", className)}
          {...props}
        />

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

Textarea.displayName = "Textarea";

export default Textarea;
