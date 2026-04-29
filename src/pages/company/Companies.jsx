import { useState } from "react";
import { Building2 } from "lucide-react";
import { useCompanies } from "../../hooks/useCompanies";
import CompanyCard from "../../components/company/CompanyCard";
import CompanyFilters from "../../components/company/CompanyFilters";
import { CompanyGridSkeleton } from "../../components/company/CompanyCardSkeleton";
import Pagination from "../../components/common/Pagination";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";

const DEFAULT_FILTERS = {
  search: "",
  industry: "",
  size: "",
  verified: "",
  sort: "interview_count",
  page: 1,
};

const Companies = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const { data, isLoading, isError, refetch } = useCompanies({
    search: filters.search || undefined,
    industry: filters.industry || undefined,
    size: filters.size || undefined,
    verified: filters.verified || undefined,
    sort: filters.sort || undefined,
    page: filters.page,
  });

  const companies = data?.data ?? [];
  const pagination = data?.current_page !== undefined ? {
    current_page: data.current_page,
    last_page: data.last_page,
    total: data.total,
    per_page: data.per_page,
  } : null;

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-container py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="section-heading">Companies</h1>
          <p className="text-dark-400 mt-1">Explore companies and their interview processes</p>
        </div>
        {pagination && (
          <p className="text-dark-500 text-sm shrink-0">
            <span className="text-white font-medium">{pagination.total}</span> companies found
          </p>
        )}
      </div>
      <CompanyFilters filters={filters} onChange={handleFilterChange} />
      {isLoading ? (
        <CompanyGridSkeleton count={9} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : companies.length === 0 ? (
        <EmptyState
          icon={<Building2 size={28} />}
          title="No companies found"
          description="Try adjusting your filters or search term."
          action={
            <Button variant="secondary" onClick={() => setFilters(DEFAULT_FILTERS)}>
              Clear Filters
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          {pagination && (
            <Pagination
              currentPage={pagination.current_page}
              lastPage={pagination.last_page}
              total={pagination.total}
              perPage={pagination.per_page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

const ErrorState = ({ onRetry }) => (
  <div className="card p-12 text-center space-y-4">
    <p className="text-4xl">😕</p>
    <p className="text-white font-medium">Failed to load companies</p>
    <p className="text-dark-400 text-sm">Something went wrong while fetching companies.</p>
    <Button variant="secondary" onClick={onRetry}>
      Try Again
    </Button>
  </div>
);

export default Companies;
