const Bone = ({ className = "" }) => <div className={`bg-dark-800 rounded-lg animate-pulse ${className}`} />;

const CompanyCardSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="h-1.5 w-full bg-dark-800 animate-pulse" />
    <div className="p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Bone className="w-11 h-11 rounded-xl" />
          <div className="space-y-2">
            <Bone className="h-4 w-32" />
            <Bone className="h-3 w-24" />
          </div>
        </div>
        <Bone className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex gap-4">
        <Bone className="h-3 w-24" />
        <Bone className="h-3 w-20" />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-dark-800">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <Bone className="h-4 w-12" />
            <Bone className="h-3 w-10" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const CompanyGridSkeleton = ({ count = 9 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <CompanyCardSkeleton key={i} />
    ))}
  </div>
);

export default CompanyCardSkeleton;
