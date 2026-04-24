// -------------------------------------------------------
// Date formatters
// -------------------------------------------------------
export const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatRelativeTime = (date) => {
  if (!date) return "—";

  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return formatDate(date);
};

// -------------------------------------------------------
// Salary formatters
// -------------------------------------------------------
export const formatSalary = (amount, currency = "INR") => {
  if (!amount) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

// -------------------------------------------------------
// String formatters
// -------------------------------------------------------
export const formatSlug = (str) => str?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "";

export const formatRole = (role) => {
  const map = {
    admin: "Admin",
    candidate: "Candidate",
    company: "Company",
    frontend: "Frontend Engineer",
    backend: "Backend Engineer",
    fullstack: "Fullstack Engineer",
    devops: "DevOps Engineer",
    data_engineer: "Data Engineer",
    mobile: "Mobile Engineer",
  };
  return map[role] ?? role;
};

export const formatOutcome = (outcome) => {
  const map = {
    offer_received: "Offer Received",
    rejected: "Rejected",
    ghosted: "Ghosted",
    pending: "Pending",
    withdrew: "Withdrew",
  };
  return map[outcome] ?? outcome;
};

export const formatDifficulty = (difficulty) => {
  const map = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };
  return map[difficulty] ?? difficulty;
};

export const truncate = (str, length = 150) => {
  if (!str) return "";
  return str.length > length ? str.slice(0, length) + "..." : str;
};

// -------------------------------------------------------
// Duration formatters
// -------------------------------------------------------
export const formatDuration = (minutes) => {
  if (!minutes) return "—";
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const formatSeconds = (seconds) => {
  if (!seconds) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};
