import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center">
    <div className="text-center space-y-4">
      <h1 className="text-8xl font-bold text-primary-500">404</h1>
      <p className="text-2xl font-semibold text-white">Page not found</p>
      <p className="text-dark-400">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary inline-block mt-4">
        Go Home
      </Link>
    </div>
  </div>
);
export default NotFound;
