import { BookOpen, Users, Star, TrendingUp } from "lucide-react";
import StatCard from "../common/StatCard";

const CompanyStats = ({ company }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Interviews" value={company.interview_count ?? 0} icon={<BookOpen size={18} />} color="blue" />
      <StatCard label="Followers" value={company.follower_count ?? 0} icon={<Users size={18} />} color="primary" />
      <StatCard
        label="Avg. Rating"
        value={company.average_rating > 0 ? `${company.average_rating.toFixed(1)} / 5` : "—"}
        icon={<Star size={18} />}
        color="yellow"
      />
      <StatCard
        label="Avg. Difficulty"
        value={company.average_difficulty > 0 ? `${company.average_difficulty.toFixed(1)} / 5` : "—"}
        icon={<TrendingUp size={18} />}
        color="red"
      />
    </div>
  );
};

export default CompanyStats;
