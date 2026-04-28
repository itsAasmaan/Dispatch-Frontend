import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, DollarSign, Info } from "lucide-react";
import { useCompany } from "../../hooks/useCompanies";
import CompanyHeader from "../../components/company/CompanyHeader";
import CompanyStats from "../../components/company/CompanyStats";
import CompanyInterviewList from "../../components/company/CompanyInterviewList";
import Tabs from "../../components/common/Tabs";
import Button from "../../components/common/Button";
import { PageSpinner } from "../../components/common/Spinner";
import { useAuthStore } from "../../store/authStore";
import CompanyHeaderSkeleton from "../../components/company/CompanyHeaderSkeleton";
import { CompanyGridSkeleton } from "../../components/company/CompanyCardSkeleton";

const TABS = [
  {
    value: "interviews",
    label: "Interviews",
    icon: <BookOpen size={14} />,
  },
  {
    value: "salaries",
    label: "Salaries",
    icon: <DollarSign size={14} />,
  },
  {
    value: "about",
    label: "About",
    icon: <Info size={14} />,
  },
];

const CompanyDetail = () => {
  const { slug } = useParams();
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState("interviews");

  const { data: company, isLoading, isError } = useCompany(slug);

  if (isLoading) {
    return (
      <div className="page-container py-8 space-y-6">
        <div className="h-5 w-32 bg-dark-800 rounded animate-pulse" />
        <CompanyHeaderSkeleton />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-5 space-y-3 animate-pulse">
              <div className="w-10 h-10 bg-dark-800 rounded-xl" />
              <div className="h-6 w-16 bg-dark-800 rounded" />
              <div className="h-4 w-24 bg-dark-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !company) {
    return (
      <div className="page-container py-20 text-center space-y-4">
        <p className="text-6xl">🏢</p>
        <h2 className="text-xl font-bold text-white">Company not found</h2>
        <p className="text-dark-400">This company doesn't exist or has been removed.</p>
        <Link to="/companies">
          <Button variant="secondary">Browse Companies</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container py-8 space-y-6">
      <Link
        to="/companies"
        className="inline-flex items-center gap-2 text-dark-400 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Companies
      </Link>

      <CompanyHeader company={company} />

      <CompanyStats company={company} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        {isAuthenticated && (
          <Link to={`/interviews/share?company=${company.id}`}>
            <Button icon={<BookOpen size={15} />} size="sm">
              Share Experience
            </Button>
          </Link>
        )}
      </div>

      <div>
        {activeTab === "interviews" && <CompanyInterviewList companyId={company.id} />}

        {activeTab === "salaries" && <SalaryTab company={company} />}

        {activeTab === "about" && <AboutTab company={company} />}
      </div>
    </div>
  );
};

const SalaryTab = ({ company }) => (
  <div className="card p-8 text-center space-y-3">
    <p className="text-3xl">💰</p>
    <p className="text-white font-medium">Salary data</p>
    <p className="text-dark-400 text-sm">View and share salary insights for {company.name}.</p>
    <Link to={`/salary-insights?company_id=${company.id}`} className="inline-block">
      <Button variant="secondary" size="sm">
        View Salaries
      </Button>
    </Link>
  </div>
);

const AboutTab = ({ company }) => (
  <div className="space-y-4">
    <div className="card p-6 space-y-5">
      {/* Description */}
      {company.description && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white">About</h3>
          <p className="text-dark-300 text-sm leading-relaxed">{company.description}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-800">
        {[
          {
            label: "Industry",
            value: company.industry,
          },
          {
            label: "Company Size",
            value: company.size ? `${company.size} employees` : null,
          },
          {
            label: "Headquarters",
            value: company.headquarters,
          },
          {
            label: "Founded",
            value: company.founded_year,
          },
          {
            label: "Website",
            value: company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                {company.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            ) : null,
          },
        ]
          .filter((item) => item.value)
          .map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-dark-500 text-xs">{item.label}</p>
              <p className="text-dark-200 text-sm">{item.value}</p>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default CompanyDetail;
