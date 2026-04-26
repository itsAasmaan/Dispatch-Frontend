import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-dark-950 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-dark-900 border-r border-dark-800 p-12">
        <div className="lg:flex flex-col justify-between lg:max-h-180">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Dispatch" className="w-8 h-8 rounded-lg" />
            <span className="text-white font-bold text-lg">Dispatch</span>
          </Link>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Ace your next
                <span className="text-primary-400"> software interview</span>
              </h2>
              <p className="text-dark-400 text-lg leading-relaxed">
                Learn from real interview experiences, practice with curated questions, and track your preparation
                journey.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "10K+", label: "Experiences" },
                { value: "500+", label: "Companies" },
                { value: "50K+", label: "Questions" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-dark-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-dark-600 text-sm">© {new Date().getFullYear()} Dispatch</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <Link to="/" className="flex items-center gap-2 mb-4 lg:hidden">
          <img src={logo} alt="Dispatch" className="w-8 h-8 rounded-lg" />
          <span className="text-white font-bold text-lg">Dispatch</span>
        </Link>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-dark-400 mt-2">{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
