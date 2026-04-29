const Bone = ({ className = "" }) => <div className={`bg-dark-800 rounded-lg animate-pulse ${className}`} />;

const InterviewCardSkeleton = () => (
  <div className="card p-5 space-y-4">
    {/* Header */}
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <Bone className="w-8 h-8 rounded-full shrink-0" />
        <div className="space-y-2">
          <Bone className="h-3 w-40" />
          <Bone className="h-4 w-56" />
          <Bone className="h-3 w-24" />
        </div>
      </div>
      <Bone className="h-5 w-20 rounded-full shrink-0" />
    </div>

    {/* Description */}
    <div className="space-y-2">
      <Bone className="h-3 w-full" />
      <Bone className="h-3 w-4/5" />
    </div>

    {/* Badges */}
    <div className="flex gap-2">
      <Bone className="h-5 w-14 rounded-full" />
      <Bone className="h-5 w-20 rounded-full" />
      <Bone className="h-5 w-16 rounded-full" />
    </div>

    {/* Footer */}
    <div className="flex gap-4 pt-3 border-t border-dark-800">
      <Bone className="h-3 w-10" />
      <Bone className="h-3 w-10" />
      <Bone className="h-3 w-10" />
    </div>
  </div>
);

export const InterviewListSkeleton = ({ count = 6 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <InterviewCardSkeleton key={i} />
    ))}
  </div>
);

export default InterviewCardSkeleton;
