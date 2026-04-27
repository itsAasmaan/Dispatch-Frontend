import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../utils/helpers";

const SearchInput = ({ placeholder = "Search...", onSearch, debounce = 400, className = "", defaultValue = "" }) => {
  const [value, setValue] = useState(defaultValue);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch?.(value.trim());
    }, debounce);

    return () => clearTimeout(timerRef.current);
  }, [value]);

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  return (
    <div className={cn("relative", className)}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="input-base pl-9 pr-9"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
