import { useAuthStore } from "./store/authStore";

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Dispatch</h1>
        <p className="text-dark-400">Software Interview Platform</p>
        {isAuthenticated ? (
          <p className="text-primary-400 text-sm">
            Logged in as {user?.name} ({user?.role})
          </p>
        ) : (
          <p className="text-dark-500 text-sm">Not logged in</p>
        )}
      </div>
    </div>
  );
}

export default App;
