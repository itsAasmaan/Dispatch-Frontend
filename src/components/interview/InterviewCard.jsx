import { Link } from "react-router-dom";
import { ThumbsUp, Eye, MessageSquare, Bookmark, MapPin, Clock, Building2, Layers } from "lucide-react";
import Card from "../common/Card";
import Avatar from "../common/Avatar";
import OutcomeBadge from "../common/OutcomeBadge";
import DifficultyBadge from "../common/DifficultyBadge";
import Badge from "../common/Badge";
import { formatRelativeTime, truncate } from "../../utils/formatters";
import { cn } from "../../utils/helpers";

const InterviewCard = ({ interview, showCompany = true }) => {
  const {
    id,
    title,
    description,
    role_title,
    outcome,
    difficulty,
    location,
    total_rounds,
    upvote_count,
    view_count,
    comment_count,
    is_upvoted,
    is_bookmarked,
    published_at,
    tags,
    user,
    company,
  } = interview;

  return (
    <Link to={`/interviews/${id}`}>
      <Card hover className="group space-y-4 my-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <Avatar src={user?.avatar} name={user?.name} size="sm" className="shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap text-xs text-dark-400">
                <span className="text-dark-200 font-medium">{user?.name ?? "Anonymous"}</span>
                {showCompany && company && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Building2 size={11} />
                      {company.name}
                    </span>
                  </>
                )}
                <span>·</span>
                <span>{formatRelativeTime(published_at)}</span>
              </div>
              <h3 className="text-white font-semibold text-sm mt-1 group-hover:text-primary-400 transition-colors line-clamp-2">
                {title}
              </h3>
              <p className="text-dark-400 text-xs mt-0.5">{role_title}</p>
            </div>
          </div>
          <OutcomeBadge outcome={outcome} />
        </div>
        {description && (
          <p className="text-dark-400 text-sm leading-relaxed line-clamp-2">{truncate(description, 160)}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <DifficultyBadge difficulty={difficulty} />
          {location && (
            <span className="inline-flex items-center gap-1 text-xs text-dark-500 bg-dark-800 px-2 py-1 rounded-full">
              <MapPin size={11} />
              {location}
            </span>
          )}
          {total_rounds && (
            <span className="inline-flex items-center gap-1 text-xs text-dark-500 bg-dark-800 px-2 py-1 rounded-full">
              <Layers size={11} />
              {total_rounds} rounds
            </span>
          )}

          {tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
          {tags?.length > 2 && <span className="text-xs text-dark-600">+{tags.length - 2}</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-dark-800">
          <div className="flex items-center gap-4">
            <StatButton
              icon={<ThumbsUp size={13} />}
              count={upvote_count ?? 0}
              active={is_upvoted}
              activeClass="text-primary-400"
            />
            <StatButton icon={<Eye size={13} />} count={view_count ?? 0} />
            <StatButton icon={<MessageSquare size={13} />} count={comment_count ?? 0} />
          </div>

          {is_bookmarked && <Bookmark size={14} className="text-primary-400 fill-primary-400" />}
        </div>
      </Card>
    </Link>
  );
};

const StatButton = ({ icon, count, active = false, activeClass = "text-white" }) => (
  <span className={cn("flex items-center gap-1 text-xs transition-colors", active ? activeClass : "text-dark-500")}>
    {icon}
    {count}
  </span>
);

export default InterviewCard;
