import { cn } from "../../utils/helpers";

const StatCard = ({ label, value, icon, trend, trendLabel, color = "primary", className = "" }) => {
  const colorMap = {
    primary: "text-primary-400 bg-primary-400/10",
    green: "text-green-400 bg-green-400/10",
    blue: "text-blue-400 bg-blue-400/10",
    yellow: "text-yellow-400 bg-yellow-400/10",
    red: "text-red-400 bg-red-400/10",
    purple: "text-purple-400 bg-purple-400/10",
  };

  return (
    <div className={cn("card p-5 space-y-4", className)}>
      <div className="flex items-start justify-between">
        {icon && (
          <div
            className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colorMap[color] ?? colorMap.primary)}
          >
            {icon}
          </div>
        )}

        {trend !== undefined && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend >= 0 ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10",
            )}
          >
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-dark-400 text-sm mt-0.5">{label}</p>
        {trendLabel && <p className="text-dark-600 text-xs mt-1">{trendLabel}</p>}
      </div>
    </div>
  );
};

export default StatCard;
