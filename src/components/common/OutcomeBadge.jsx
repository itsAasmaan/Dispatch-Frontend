import { getOutcomeColor } from "../../utils/helpers";
import { formatOutcome } from "../../utils/formatters";

const OutcomeBadge = ({ outcome, size = "md" }) => {
  const colorClass = getOutcomeColor(outcome);

  return (
    <span
      className={`
      inline-flex items-center gap-1
      px-2.5 py-1 rounded-full text-xs font-medium
      ${colorClass}
    `}
    >
      {formatOutcome(outcome)}
    </span>
  );
};

export default OutcomeBadge;
