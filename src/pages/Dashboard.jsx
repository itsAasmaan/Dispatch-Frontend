import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Avatar, Badge, Card, StatCard, ProgressBar, Button, Tabs } from "../components/common";
import { BookOpen, HelpCircle, Brain, Flame } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="page-container py-10 space-y-8">
      <div className="flex items-center gap-4">
        <Avatar src={user?.avatar} name={user?.name} size="lg" />
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name} 👋</h1>
            <Badge variant="primary">{user?.role}</Badge>
          </div>
          <p className="text-dark-400 mt-1">@{user?.username}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { label: "Overview", value: "overview" },
          { label: "Activity", value: "activity" },
          { label: "Bookmarks", value: "bookmarks" },
        ]}
      />

      {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Interviews Shared" value="0" color="blue" icon={<BookOpen size={18} />} />
            <StatCard label="Questions Solved" value="0" color="green" icon={<HelpCircle size={18} />} />
            <StatCard label="Quizzes Taken" value="0" color="purple" icon={<Brain size={18} />} />
            <StatCard label="Current Streak" value="0 🔥" color="yellow" icon={<Flame size={18} />} />
          </div>

          {user?.role === "candidate" && (
            <Card>
              <Card.Header>
                <Card.Title>Preparation Progress</Card.Title>
              </Card.Header>
              <Card.Body>
                <ProgressBar value={0} label="Overall Progress" showLabel color="primary" />
                <ProgressBar value={0} label="DSA Topics" showLabel color="blue" />
                <ProgressBar value={0} label="System Design" showLabel color="green" />
              </Card.Body>
            </Card>
          )}
        </>
      )}

      {activeTab === "activity" && (
        <Card>
          <Card.Body>
            <p className="text-dark-400 text-sm text-center py-8">
              No activity yet. Start by sharing an interview experience!
            </p>
          </Card.Body>
        </Card>
      )}

      {activeTab === "bookmarks" && (
        <Card>
          <Card.Body>
            <p className="text-dark-400 text-sm text-center py-8">
              No bookmarks yet. Bookmark interviews and questions to find them here.
            </p>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
