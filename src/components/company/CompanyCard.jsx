import { Link } from "react-router-dom";
import { Users, Star, BookOpen, MapPin } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { cn } from "../../utils/helpers";

const CompanyCard = ({ company }) => {
  return (
    <Link to={`/companies/${company.slug}`}>
      <Card hover padding={false} className="group overflow-hidden">
        <div className="h-1.5 w-full bg-linear-to-r from-primary-600 to-primary-400" />
        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <CompanyLogo logo={company.logo} name={company.name} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors truncate">
                    {company.name}
                  </h3>
                  {company.is_verified && (
                    <span title="Verified company" className="text-primary-400 text-xs">
                      ✓
                    </span>
                  )}
                </div>
                {company.tagline && <p className="w-48 text-dark-500 text-xs mt-0.5 truncate">{company.tagline}</p>}
              </div>
            </div>
            {company.industry && (
              <Badge variant="default" size="sm" className="shrink-0">
                {company.industry}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-dark-500">
            {company.headquarters && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {company.headquarters}
              </span>
            )}
            {company.size && (
              <span className="flex items-center gap-1">
                <Users size={12} />
                {company.size}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-dark-800">
            <StatItem icon={<BookOpen size={13} />} value={company.interview_count ?? 0} label="Interviews" />
            <StatItem icon={<Users size={13} />} value={company.follower_count ?? 0} label="Followers" />
            <StatItem
              icon={<Star size={13} />}
              value={company.average_rating > 0 ? company.average_rating.toFixed(1) : "—"}
              label="Rating"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
};

const CompanyLogo = ({ logo, name }) => {
  const initials = name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (logo) {
    return (
      <img src={logo} alt={name} className="w-11 h-11 rounded-xl object-cover bg-dark-800 border border-dark-700" />
    );
  }

  return (
    <div className="w-11 h-11 rounded-xl bg-primary-600/20 border border-primary-500/20 flex items-center justify-center text-primary-400 font-bold text-sm shrink-0">
      {initials}
    </div>
  );
};

const StatItem = ({ icon, value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="flex items-center gap-1 text-dark-400">
      {icon}
      <span className="text-white text-sm font-semibold">{value}</span>
    </div>
    <span className="text-dark-600 text-xs">{label}</span>
  </div>
);

export default CompanyCard;
