import AppRouter from "./router";
import PageWrapper from "./components/layout/PageWrapper";

const AUTH_ROUTES = ["/login", "/register"];
const FULL_SCREEN = ["/quizzes", "/take"];
function App() {
  return (
    <PageWrapper>
      <AppRouter />
    </PageWrapper>
  );
}

export default App;
