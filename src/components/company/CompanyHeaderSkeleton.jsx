const Bone = ({ className = "" }) => <div className={`bg-dark-800 rounded-lg animate-pulse ${className}`} />;

const CompanyHeaderSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="h-24 bg-dark-800 animate-pulse" />
    <div className="px-6 pb-6">
      <div className="flex items-end justify-between -mt-8 mb-4">
        <Bone className="w-20 h-20 rounded-2xl" />
        <Bone className="w-24 h-9 rounded-lg" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Bone className="h-7 w-40" />
          <Bone className="h-5 w-16 rounded-full" />
        </div>
        <Bone className="h-4 w-64" />
        <div className="flex gap-4">
          <Bone className="h-4 w-28" />
          <Bone className="h-4 w-24" />
          <Bone className="h-4 w-20" />
        </div>
        <div className="flex gap-3">
          <Bone className="h-4 w-16" />
          <Bone className="h-4 w-16" />
        </div>
      </div>
    </div>
  </div>
);

export default CompanyHeaderSkeleton;
