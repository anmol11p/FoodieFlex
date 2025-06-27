const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white/10 border border-white/10 rounded-xl py-4 px-5 shadow-md">
      <div className="bg-gray-300 h-40 w-full rounded-md mb-4" />
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-4" />
      <div className="flex justify-between gap-2">
        <div className="h-8 w-20 bg-gray-300 rounded-full" />
        <div className="h-8 w-20 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonCard;
