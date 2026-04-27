import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/helpers";

const Pagination = ({ currentPage, lastPage, total, perPage, onPageChange }) => {
  if (lastPage <= 1) return null;

  const pages = generatePages(currentPage, lastPage);
  const fromItem = (currentPage - 1) * perPage + 1;
  const toItem = Math.min(currentPage * perPage, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <p className="text-sm text-dark-400">
        Showing{" "}
        <span className="text-white">
          {fromItem}–{toItem}
        </span>{" "}
        of <span className="text-white">{total}</span> results
      </p>
      <div className="flex items-center gap-1">
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          icon={<ChevronLeft size={16} />}
        />

        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className="w-9 h-9 flex items-center justify-center text-dark-500 text-sm">
              …
            </span>
          ) : (
            <PageButton key={page} onClick={() => onPageChange(page)} active={page === currentPage} label={page} />
          ),
        )}

        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          icon={<ChevronRight size={16} />}
        />
      </div>
    </div>
  );
};

const PageButton = ({ onClick, disabled, active, label, icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
      active ? "bg-primary-600 text-white" : "text-dark-400 hover:text-white hover:bg-dark-800",
      disabled && "opacity-30 cursor-not-allowed hover:bg-transparent hover:text-dark-400",
    )}
  >
    {icon ?? label}
  </button>
);

const generatePages = (current, last) => {
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", last];
  }

  if (current >= last - 3) {
    return [1, "...", last - 4, last - 3, last - 2, last - 1, last];
  }

  return [1, "...", current - 1, current, current + 1, "...", last];
};

export default Pagination;
