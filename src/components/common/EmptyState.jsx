import { cn } from "../../utils/helpers";

const EmptyState = ({ icon, title = "Nothing here yet", description, action, className = "" }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", "py-16 px-6 text-center", className)}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mb-5 text-dark-500">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      {description && <p className="text-dark-400 text-sm max-w-sm leading-relaxed mb-6">{description}</p>}

      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
