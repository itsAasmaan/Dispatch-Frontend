import { clsx } from "clsx";

export const cn = (...classes) => clsx(...classes);

export const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getOutcomeColor = (outcome) => {
  const map = {
    offer_received: "text-green-400 bg-green-400/10",
    rejected: "text-red-400 bg-red-400/10",
    ghosted: "text-yellow-400 bg-yellow-400/10",
    pending: "text-blue-400 bg-blue-400/10",
    withdrew: "text-dark-400 bg-dark-400/10",
  };
  return map[outcome] ?? "text-dark-400 bg-dark-400/10";
};

export const getDifficultyColor = (difficulty) => {
  const map = {
    easy: "text-green-400 bg-green-400/10",
    medium: "text-yellow-400 bg-yellow-400/10",
    hard: "text-red-400 bg-red-400/10",
    beginner: "text-green-400 bg-green-400/10",
    intermediate: "text-yellow-400 bg-yellow-400/10",
    advanced: "text-red-400 bg-red-400/10",
  };
  return map[difficulty] ?? "text-dark-400 bg-dark-400/10";
};

export const getCategoryColor = (category) => {
  const map = {
    dsa: "text-purple-400 bg-purple-400/10",
    system_design: "text-blue-400 bg-blue-400/10",
    behavioural: "text-pink-400 bg-pink-400/10",
    frontend: "text-cyan-400 bg-cyan-400/10",
    backend: "text-orange-400 bg-orange-400/10",
    devops: "text-yellow-400 bg-yellow-400/10",
    database: "text-green-400 bg-green-400/10",
    other: "text-dark-400 bg-dark-400/10",
  };
  return map[category] ?? "text-dark-400 bg-dark-400/10";
};

export const getValidationErrors = (error) => {
  return error?.response?.data?.errors ?? {};
};

export const isEmpty = (obj) => obj && Object.keys(obj).length === 0;
