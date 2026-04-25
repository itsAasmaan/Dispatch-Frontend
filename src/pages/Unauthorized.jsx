import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center">
    <div className="text-center space-y-4">
      <h1 className="text-8xl font-bold text-red-500">403</h1>
      <p className="text-2xl font-semibold text-white">Access Denied</p>
      <p className="text-dark-400">You do not have permission to view this page.</p>
      <Link to="/" className="btn-primary inline-block mt-4">
        Go Home
      </Link>
    </div>
  </div>
);
export default Unauthorized;
