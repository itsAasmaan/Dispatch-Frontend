import { useState } from "react";
import { Filter, X } from "lucide-react";
import SearchInput from "../common/SearchInput";
import Select from "../common/Select";
import Button from "../common/Button";
import { cn } from "../../utils/helpers";

const INDUSTRIES = [
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "E-Commerce", label: "E-Commerce" },
  { value: "Education", label: "Education" },
  { value: "Telecommunications", label: "Telecommunications" },
];

const SIZES = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "5001+", label: "5001+ employees" },
];

const SORT_OPTIONS = [
  { value: "interview_count", label: "Most Interviews" },
  { value: "follower_count", label: "Most Followed" },
  { value: "name", label: "Alphabetical" },
];

const CompanyFilters = ({ filters, onChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = filters.industry || filters.size || filters.verified;

  const handleClear = () => {
    onChange({
      search: "",
      industry: "",
      size: "",
      verified: "",
      sort: "interview_count",
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <SearchInput
          placeholder="Search companies..."
          defaultValue={filters.search}
          onSearch={(val) => onChange({ ...filters, search: val })}
          className="flex-1"
        />
        <Button
          variant="secondary"
          icon={<Filter size={15} />}
          onClick={() => setShowFilters(!showFilters)}
          className={cn(showFilters || hasActiveFilters ? "border-primary-500 text-primary-400" : "")}
        >
          Filters
          {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary-500 ml-1" />}
        </Button>
      </div>
      {showFilters && (
        <div className="card p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Industry"
              placeholder="All industries"
              options={INDUSTRIES}
              value={filters.industry}
              onChange={(e) => onChange({ ...filters, industry: e.target.value })}
            />
            <Select
              label="Company size"
              placeholder="Any size"
              options={SIZES}
              value={filters.size}
              onChange={(e) => onChange({ ...filters, size: e.target.value })}
            />
            <Select
              label="Sort by"
              placeholder="Sort by"
              options={SORT_OPTIONS}
              value={filters.sort}
              onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() =>
                  onChange({
                    ...filters,
                    verified: filters.verified ? "" : "1",
                  })
                }
                className={cn(
                  "w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer",
                  filters.verified ? "bg-primary-600" : "bg-dark-700",
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 mt-0.5",
                    filters.verified ? "translate-x-4 ml-0.5" : "translate-x-0.5",
                  )}
                />
              </div>
              <span className="text-sm text-dark-300">Verified companies only</span>
            </label>

            {hasActiveFilters && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-white transition-colors"
              >
                <X size={12} />
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyFilters;
