import { useState } from "react";
import { Filter, X } from "lucide-react";
import SearchInput from "../common/SearchInput";
import Select from "../common/Select";
import Button from "../common/Button";
import { cn } from "../../utils/helpers";

const OUTCOMES = [
  { value: "offer_received", label: "✅ Offer Received" },
  { value: "rejected", label: "❌ Rejected" },
  { value: "ghosted", label: "👻 Ghosted" },
  { value: "pending", label: "⏳ Pending" },
  { value: "withdrew", label: "🚪 Withdrew" },
];

const DIFFICULTIES = [
  { value: "1", label: "⭐ Very Easy" },
  { value: "2", label: "⭐⭐ Easy" },
  { value: "3", label: "⭐⭐⭐ Medium" },
  { value: "4", label: "⭐⭐⭐⭐ Hard" },
  { value: "5", label: "⭐⭐⭐⭐⭐ Very Hard" },
];

const SORT_OPTIONS = [
  { value: "published_at", label: "Most Recent" },
  { value: "upvote_count", label: "Most Upvoted" },
  { value: "view_count", label: "Most Viewed" },
];

const LOCATIONS = [
  { value: "remote", label: "🏠 Remote" },
  { value: "onsite", label: "🏢 Onsite" },
  { value: "hybrid", label: "🔄 Hybrid" },
];

const InterviewFilters = ({ filters, onChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = filters.outcome || filters.difficulty || filters.location || filters.role_title;

  const handleClear = () => {
    onChange({
      search: "",
      outcome: "",
      difficulty: "",
      location: "",
      role_title: "",
      sort: "published_at",
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <SearchInput
          placeholder="Search by role, company, tags..."
          defaultValue={filters.search}
          onSearch={(val) => onChange({ ...filters, search: val })}
          className="flex-1"
        />
        <Select
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="w-40 hidden sm:block"
          placeholder="Sort by"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Outcome"
              placeholder="Any outcome"
              options={OUTCOMES}
              value={filters.outcome}
              onChange={(e) => onChange({ ...filters, outcome: e.target.value })}
            />
            <Select
              label="Difficulty"
              placeholder="Any difficulty"
              options={DIFFICULTIES}
              value={filters.difficulty}
              onChange={(e) => onChange({ ...filters, difficulty: e.target.value })}
            />
            <Select
              label="Location"
              placeholder="Any location"
              options={LOCATIONS}
              value={filters.location}
              onChange={(e) => onChange({ ...filters, location: e.target.value })}
            />
            <Select
              label="Sort by"
              placeholder="Sort by"
              options={SORT_OPTIONS}
              value={filters.sort}
              onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            />
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-white transition-colors"
              >
                <X size={12} />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.outcome && (
            <FilterChip
              label={`Outcome: ${filters.outcome.replace("_", " ")}`}
              onRemove={() => onChange({ ...filters, outcome: "" })}
            />
          )}
          {filters.difficulty && (
            <FilterChip
              label={`Difficulty: ${filters.difficulty}`}
              onRemove={() => onChange({ ...filters, difficulty: "" })}
            />
          )}
          {filters.location && (
            <FilterChip
              label={`Location: ${filters.location}`}
              onRemove={() => onChange({ ...filters, location: "" })}
            />
          )}
        </div>
      )}
    </div>
  );
};

const FilterChip = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full border border-primary-500/20">
    {label}
    <button onClick={onRemove} className="hover:text-white transition-colors ml-0.5">
      <X size={11} />
    </button>
  </span>
);

export default InterviewFilters;
