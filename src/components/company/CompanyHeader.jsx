import { useState } from "react";
import { Globe, MapPin, Users, Calendar, CheckCircle, Bell, BellOff } from "lucide-react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { useAuthStore } from "../../store/authStore";
import { useFollowCompany, useUnfollowCompany } from "../../hooks/useCompanies";

const CompanyHeader = ({ company }) => {
  const { isAuthenticated } = useAuthStore();
  const followMutation = useFollowCompany();
  const unfollowMutation = useUnfollowCompany();
  const [followed, setFollowed] = useState(company.is_followed ?? false);

  const isLoading = followMutation.isPending || unfollowMutation.isPending;

  const handleFollowToggle = () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    if (followed) {
      unfollowMutation.mutate(company.slug, {
        onSuccess: () => setFollowed(false),
      });
    } else {
      followMutation.mutate(company.slug, {
        onSuccess: () => setFollowed(true),
      });
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="h-24 bg-linear-to-br from-primary-900/40 via-dark-800 to-dark-900" />
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-8 mb-4">
          <div className="relative">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-dark-900 bg-dark-800"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl border-4 border-dark-900 bg-primary-600/20 flex items-center justify-center text-primary-400 font-bold text-2xl">
                {company.name?.slice(0, 2).toUpperCase()}
              </div>
            )}

            {company.is_verified && (
              <div
                title="Verified company"
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <CheckCircle size={14} className="text-white" />
              </div>
            )}
          </div>

          <Button
            variant={followed ? "secondary" : "primary"}
            icon={followed ? <BellOff size={15} /> : <Bell size={15} />}
            loading={isLoading}
            onClick={handleFollowToggle}
            className="shrink-0"
          >
            {followed ? "Unfollow" : "Follow"}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{company.name}</h1>
            {company.is_verified && (
              <Badge variant="primary" size="sm">
                Verified
              </Badge>
            )}
            {company.industry && (
              <Badge variant="default" size="sm">
                {company.industry}
              </Badge>
            )}
          </div>
          {company.tagline && <p className="text-dark-300 text-sm">{company.tagline}</p>}
          <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400">
            {company.headquarters && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {company.headquarters}
              </span>
            )}
            {company.size && (
              <span className="flex items-center gap-1.5">
                <Users size={14} />
                {company.size} employees
              </span>
            )}
            {company.founded_year && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                Founded {company.founded_year}
              </span>
            )}
          </div>

          {/* <div className="flex items-center gap-3 pt-1">
            {company.website && <SocialLink href={company.website} icon={<Globe size={16} />} label="Website" />}
            {company.linkedin_url && (
              <SocialLink href={company.linkedin_url} icon={<Linkedin size={16} />} label="LinkedIn" />
            )}
            {company.twitter_url && (
              <SocialLink href={company.twitter_url} icon={<Twitter size={16} />} label="Twitter" />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    className="flex items-center gap-1.5 text-dark-400 hover:text-white transition-colors text-sm"
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </a>
);

export default CompanyHeader;
