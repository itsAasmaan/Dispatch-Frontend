import { cn } from "../../utils/helpers";
import Spinner from "./Spinner";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={cn(variants[variant] ?? variants.primary, "flex items-center justify-center gap-2", className)}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
