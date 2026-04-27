import { cn } from "../../utils/helpers";

const Card = ({ children, className = "", hover = false, padding = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "card",
        padding && "p-5",
        hover &&
          "hover:border-dark-700 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 cursor-pointer",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className = "" }) => (
  <div className={cn("mb-4 pb-4 border-b border-dark-800", className)}>{children}</div>
);

Card.Title = ({ children, className = "" }) => (
  <h3 className={cn("text-lg font-semibold text-white", className)}>{children}</h3>
);

Card.Body = ({ children, className = "" }) => <div className={cn("space-y-3", className)}>{children}</div>;

Card.Footer = ({ children, className = "" }) => (
  <div className={cn("mt-4 pt-4 border-t border-dark-800 flex items-center justify-between", className)}>
    {children}
  </div>
);

export default Card;
