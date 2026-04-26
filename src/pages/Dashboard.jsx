import { Navigate }      from 'react-router-dom'
import { useAuthStore }  from '../store/authStore'
import Avatar            from '../components/common/Avatar'
import Badge             from '../components/common/Badge'
import { formatDate }    from '../utils/formatters'

const Dashboard = () => {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="page-container py-10 space-y-8">
      <div className="flex items-center gap-4">
        <Avatar src={user?.avatar} name={user?.name} size="lg" />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {user?.name} 👋
            </h1>
            <Badge variant="primary">{user?.role}</Badge>
          </div>
          <p className="text-dark-400 mt-1">@{user?.username}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Interviews Shared', value: '0',  color: 'text-blue-400' },
          { label: 'Questions Solved',  value: '0',  color: 'text-green-400' },
          { label: 'Quizzes Taken',     value: '0',  color: 'text-purple-400' },
          { label: 'Current Streak',    value: '0🔥', color: 'text-orange-400' },
        ].map((stat) => (
          <div key={stat.label} className="card p-5 space-y-2">
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-dark-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Role-specific content */}
      {user?.role === 'candidate' && (
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: '📝 Share Experience', to: '/interviews/share' },
              { label: '🧠 Take a Quiz',      to: '/quizzes' },
              { label: '🗺️ View Roadmaps',    to: '/roadmaps' },
              { label: '📋 My Plans',         to: '/preparation' },
              { label: '🏢 Browse Companies', to: '/companies' },
              { label: '❓ Practice Questions', to: '/questions' },
            ].map((action) => (
              <a
                key={action.to}
                href={action.to}
                className="card p-4 text-sm text-dark-300 hover:text-white hover:border-primary-500/50 transition-all duration-200 text-center"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {user?.role === 'admin' && (
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Admin Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: '📊 View Stats',        to: '/admin' },
              { label: '👥 Manage Users',       to: '/admin/users' },
              { label: '🚩 Flagged Comments',   to: '/admin/comments' },
              { label: '✅ Pending Questions',  to: '/admin/questions' },
            ].map((action) => (
              <a
                key={action.to}
                href={action.to}
                className="card p-4 text-sm text-dark-300 hover:text-white hover:border-primary-500/50 transition-all duration-200 text-center"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard