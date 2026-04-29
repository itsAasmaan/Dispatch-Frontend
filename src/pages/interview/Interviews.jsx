import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BookOpen, Plus } from "lucide-react";
import { useInterviews } from "../../hooks/useInterviews";
import InterviewCard from "../../components/interview/InterviewCard";
import InterviewFilters from "../../components/interview/InterviewFilters";
import { InterviewListSkeleton } from "../../components/interview/InterviewCardSkeleton";
import Pagination from "../../components/common/Pagination";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import { useAuthStore } from "../../store/authStore";

const DEFAULT_FILTERS = {
  search: "",
  outcome: "",
  difficulty: "",
  location: "",
  role_title: "",
  sort: "published_at",
  page: 1,
};

const Interviews = () => {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuthStore();

  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    company_id: searchParams.get("company_id") ?? "",
  });

  const { data, isLoading, isError, refetch } = useInterviews({
    search: filters.search || undefined,
    outcome: filters.outcome || undefined,
    difficulty: filters.difficulty || undefined,
    location: filters.location || undefined,
    role_title: filters.role_title || undefined,
    company_id: filters.company_id || undefined,
    sort: filters.sort || undefined,
    page: filters.page,
  });

  console.log(data);
  const interviews = data?.data ?? [];
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
          <h1 className="section-heading">Interview Experiences</h1>
          <p className="text-dark-400 mt-1">Real experiences shared by the community</p>
        </div>
        <div className="flex items-center gap-3">
          {pagination && (
            <p className="text-dark-500 text-sm shrink-0">
              <span className="text-white font-medium">{pagination.total}</span> experiences
            </p>
          )}
          {isAuthenticated && user?.role === "candidate" && (
            <Link to="/interviews/share">
              <Button icon={<Plus size={15} />} size="sm">
                Share Yours
              </Button>
            </Link>
          )}
        </div>
      </div>

      <InterviewFilters filters={filters} onChange={handleFilterChange} />

      {isLoading ? (
        <InterviewListSkeleton count={6} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : interviews.length === 0 ? (
        <EmptyState
          icon={<BookOpen size={28} />}
          title="No experiences found"
          description="Try adjusting your filters or be the first to share."
          action={
            isAuthenticated && user?.role === "candidate" ? (
              <Link to="/interviews/share">
                <Button icon={<Plus size={15} />}>Share Your Experience</Button>
              </Link>
            ) : (
              <Button variant="secondary" onClick={() => setFilters(DEFAULT_FILTERS)}>
                Clear Filters
              </Button>
            )
          }
        />
      ) : (
        <>
          <div className="space-y-4">
            {interviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
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
    <p className="text-white font-medium">Failed to load interviews</p>
    <p className="text-dark-400 text-sm">Something went wrong while fetching interview experiences.</p>
    <Button variant="secondary" onClick={onRetry}>
      Try Again
    </Button>
  </div>
);

export default Interviews;
