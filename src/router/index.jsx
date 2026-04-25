import { Routes, Route } from "react-router-dom";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Pages — Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Pages — General
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

// Pages — Company
import Companies from "../pages/company/Companies";
import CompanyDetail from "../pages/company/CompanyDetail";

// Pages — Interview
import Interviews from "../pages/interview/Interviews";
import InterviewDetail from "../pages/interview/InterviewDetail";
import ShareInterview from "../pages/interview/ShareInterview";

// Pages — Question
import Questions from "../pages/question/Questions";
import QuestionDetail from "../pages/question/QuestionDetail";

// Pages — Quiz
import Quizzes from "../pages/quiz/Quizzes";
import QuizDetail from "../pages/quiz/QuizDetail";
import TakeQuiz from "../pages/quiz/TakeQuiz";

// Pages — Roadmap
import Roadmaps from "../pages/roadmap/Roadmaps";
import RoadmapDetail from "../pages/roadmap/RoadmapDetail";

// Pages — Preparation
import MyPlans from "../pages/preparation/MyPlans";
import PlanDetail from "../pages/preparation/PlanDetail";

// Pages — Salary
import SalaryInsights from "../pages/salary/SalaryInsights";

// Pages — Profile
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";

// Pages — Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminComments from "../pages/admin/AdminComments";
import AdminQuestions from "../pages/admin/AdminQuestions";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Companies — public */}
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/:slug" element={<CompanyDetail />} />

      {/* Interviews — public */}
      <Route path="/interviews" element={<Interviews />} />
      <Route path="/interviews/:id" element={<InterviewDetail />} />

      {/* Questions — public */}
      <Route path="/questions" element={<Questions />} />
      <Route path="/questions/:id" element={<QuestionDetail />} />

      {/* Quizzes — public */}
      <Route path="/quizzes" element={<Quizzes />} />
      <Route path="/quizzes/:id" element={<QuizDetail />} />

      {/* Roadmaps — public */}
      <Route path="/roadmaps" element={<Roadmaps />} />
      <Route path="/roadmaps/:slug" element={<RoadmapDetail />} />

      {/* Salary — public */}
      <Route path="/salary-insights" element={<SalaryInsights />} />

      {/* Public profile */}
      <Route path="/profile/:username" element={<Profile />} />

      {/* -------------------------------------------------- */}
      {/* Protected routes — any authenticated user          */}
      {/* -------------------------------------------------- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      {/* -------------------------------------------------- */}
      {/* Candidate only routes                              */}
      {/* -------------------------------------------------- */}
      <Route
        path="/interviews/share"
        element={
          <RoleRoute roles={["candidate"]}>
            <ShareInterview />
          </RoleRoute>
        }
      />

      <Route
        path="/quizzes/:id/take"
        element={
          <RoleRoute roles={["candidate"]}>
            <TakeQuiz />
          </RoleRoute>
        }
      />

      <Route
        path="/preparation"
        element={
          <RoleRoute roles={["candidate"]}>
            <MyPlans />
          </RoleRoute>
        }
      />

      <Route
        path="/preparation/:id"
        element={
          <RoleRoute roles={["candidate"]}>
            <PlanDetail />
          </RoleRoute>
        }
      />

      {/* -------------------------------------------------- */}
      {/* Admin only routes                                  */}
      {/* -------------------------------------------------- */}
      <Route
        path="/admin"
        element={
          <RoleRoute roles={["admin"]}>
            <AdminDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <RoleRoute roles={["admin"]}>
            <AdminUsers />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/comments"
        element={
          <RoleRoute roles={["admin"]}>
            <AdminComments />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/questions"
        element={
          <RoleRoute roles={["admin"]}>
            <AdminQuestions />
          </RoleRoute>
        }
      />

      {/* -------------------------------------------------- */}
      {/* 404                                                */}
      {/* -------------------------------------------------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
