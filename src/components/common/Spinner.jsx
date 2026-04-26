import { cn } from "../../utils/helpers";

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
  xl: "w-16 h-16",
};

const Spinner = ({ size = "md", className = "" }) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        "border-2 border-dark-700 border-t-primary-500",
        sizes[size] ?? sizes.md,
        className,
      )}
    />
  );
};

export const PageSpinner = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Spinner size="lg" />
      <p className="text-dark-400 text-sm animate-pulse">Loading...</p>
    </div>
  </div>
);

export default Spinner;
