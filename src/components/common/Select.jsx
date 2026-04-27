import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/helpers";

const Select = forwardRef(
  (
    {
      label,
      error,
      hint,
      options = [],
      placeholder = "Select an option",
      className = "",
      containerClass = "",
      required = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("flex flex-col gap-1.5", containerClass)}>
        {label && (
          <label className="text-sm font-medium text-dark-200">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "input-base appearance-none pr-10",
              error && "border-red-500/50 focus:ring-red-500",
              className,
            )}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 pointer-events-none"
          />
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

Select.displayName = "Select";

export default Select;
