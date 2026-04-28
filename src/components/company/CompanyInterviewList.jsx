import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { interviewApi } from "../../api/interview.api";
import OutcomeBadge from "../common/OutcomeBadge";
import DifficultyBadge from "../common/DifficultyBadge";
import EmptyState from "../common/EmptyState";
import Spinner from "../common/Spinner";
import { formatRelativeTime } from "../../utils/formatters";
import { BookOpen, ThumbsUp, Eye } from "lucide-react";

const CompanyInterviewList = ({ companyId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["interviews", "company", companyId],
    queryFn: () => interviewApi.getAll({ company_id: companyId, per_page: 5 }).then((r) => r.data.data),
    enabled: !!companyId,
  });

  const interviews = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <EmptyState
        icon={<BookOpen size={24} />}
        title="No interviews yet"
        description="Be the first to share your interview experience at this company."
      />
    );
  }

  return (
    <div className="space-y-3">
      {interviews.map((interview) => (
        <Link key={interview.id} to={`/interviews/${interview.id}`} className="block">
          <div className="card hover:border-dark-700 transition-all duration-200 p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="text-white font-medium text-sm truncate">{interview.title}</h4>
                <p className="text-dark-500 text-xs mt-0.5">{interview.role_title}</p>
              </div>
              <OutcomeBadge outcome={interview.outcome} />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <DifficultyBadge difficulty={interview.difficulty} />
              {interview.location && (
                <span className="text-xs text-dark-500 bg-dark-800 px-2 py-0.5 rounded-full">{interview.location}</span>
              )}
              {interview.total_rounds && (
                <span className="text-xs text-dark-500 bg-dark-800 px-2 py-0.5 rounded-full">
                  {interview.total_rounds} rounds
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-dark-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={11} />
                  {interview.upvote_count ?? 0}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={11} />
                  {interview.view_count ?? 0}
                </span>
              </div>
              <span>{formatRelativeTime(interview.published_at)}</span>
            </div>
          </div>
        </Link>
      ))}

      {data?.meta?.total > 5 && (
        <Link
          to={`/interviews?company_id=${companyId}`}
          className="block text-center text-sm text-primary-400 hover:text-primary-300 py-2 transition-colors"
        >
          View all {data.meta.total} interviews →
        </Link>
      )}
    </div>
  );
};

export default CompanyInterviewList;
