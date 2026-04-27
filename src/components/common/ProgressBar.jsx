import { cn } from "../../utils/helpers";

const colors = {
  primary: "bg-primary-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

const sizes = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const ProgressBar = ({
  value = 0,
  max = 100,
  color = "primary",
  size = "md",
  showLabel = false,
  label,
  className = "",
  animated = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("space-y-1.5", className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm text-dark-300">{label}</span>}
          {showLabel && <span className="text-sm font-medium text-white">{Math.round(percentage)}%</span>}
        </div>
      )}

      <div className={cn("w-full bg-dark-800 rounded-full overflow-hidden", sizes[size] ?? sizes.md)}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            colors[color] ?? colors.primary,
            animated && "animate-pulse",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
