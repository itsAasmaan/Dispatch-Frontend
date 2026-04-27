import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/helpers";

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-6xl",
};

const Modal = ({ isOpen, onClose, title, children, size = "md", hideClose = false, className = "" }) => {
  const overlayRef = useRef(null);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div
        className={cn(
          "relative w-full bg-dark-900 border border-dark-700",
          "rounded-2xl shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200",
          sizes[size] ?? sizes.md,
          className,
        )}
      >
        {(title || !hideClose) && (
          <div className="flex items-center justify-between p-6 border-b border-dark-800">
            {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
            {!hideClose && (
              <button
                onClick={onClose}
                className="ml-auto p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

Modal.Footer = ({ children, className = "" }) => (
  <div className={cn("flex items-center justify-end gap-3 mt-6 pt-6 border-t border-dark-800", className)}>
    {children}
  </div>
);

export default Modal;
