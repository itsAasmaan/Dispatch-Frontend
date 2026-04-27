import { cn } from "../../utils/helpers";

const Tabs = ({ tabs, activeTab, onChange, className = "" }) => {
  return (
    <div className={cn("flex gap-1 p-1 bg-dark-800/50 rounded-xl w-fit", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            "flex items-center gap-2",
            activeTab === tab.value ? "bg-dark-700 text-white shadow-sm" : "text-dark-400 hover:text-white",
          )}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                activeTab === tab.value ? "bg-primary-500/20 text-primary-400" : "bg-dark-700 text-dark-500",
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
