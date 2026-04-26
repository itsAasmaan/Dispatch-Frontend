import { useLocation } from "react-router-dom";
import AppRouter from "./router";
import PageWrapper from "./components/layout/PageWrapper";

const AUTH_PATHS = ["/login", "/register"];

function App() {
  const location = useLocation();
  const isAuthPage = AUTH_PATHS.includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-dark-950">
        <AppRouter />
      </div>
    );
  }

  return (
    <PageWrapper>
      <AppRouter />
    </PageWrapper>
  );
}

export default App;
