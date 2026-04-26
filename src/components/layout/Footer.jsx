import { Link } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "Companies", to: "/companies" },
    { label: "Experiences", to: "/interviews" },
    { label: "Questions", to: "/questions" },
    { label: "Quizzes", to: "/quizzes" },
    { label: "Roadmaps", to: "/roadmaps" },
    { label: "Salaries", to: "/salary-insights" },
  ],
  Account: [
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "My Plans", to: "/preparation" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-dark-800 bg-dark-950 mt-20">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-white font-bold text-lg">Dispatch</span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-xs">
              The software interview platform for candidates who want to learn from real experiences and prepare
              smarter.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-dark-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">© {new Date().getFullYear()} Dispatch. Built for learning.</p>
          <p className="text-dark-600 text-xs">Laravel + React • Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
