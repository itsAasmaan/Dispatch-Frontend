import Badge from "./Badge";
import { getDifficultyColor } from "../../utils/helpers";
import { formatDifficulty } from "../../utils/formatters";

const DifficultyBadge = ({ difficulty, size = "md" }) => {
  const colorClass = getDifficultyColor(difficulty);

  return (
    <span
      className={`
      inline-flex items-center gap-1
      px-2.5 py-1 rounded-full text-xs font-medium
      ${colorClass}
    `}
    >
      {formatDifficulty(difficulty)}
    </span>
  );
};

export default DifficultyBadge;
