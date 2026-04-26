import { cn } from "../../utils/helpers";

const variants = {
  default: "bg-dark-700 text-dark-300",
  primary: "bg-primary-500/20 text-primary-400",
  success: "bg-green-500/20 text-green-400",
  warning: "bg-yellow-500/20 text-yellow-400",
  danger: "bg-red-500/20 text-red-400",
  info: "bg-blue-500/20 text-blue-400",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

const Badge = ({ children, variant = "default", size = "md", className = "" }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant] ?? variants.default,
        sizes[size] ?? sizes.md,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
