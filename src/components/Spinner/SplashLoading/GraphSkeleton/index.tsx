interface GraphSkeletonGridProps {
  count?: number;
}

export function GraphSkeleton({ count = 4 }: GraphSkeletonGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <GraphSkeletonItem key={index} />
      ))}
    </div>
  );
}

function GraphSkeletonItem() {
  return (
    <div className="bg-gray-100 p-4 rounded overflow-hidden">
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="relative h-48">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300"></div>
          <div className="absolute left-0 bottom-0 right-0 h-1 bg-gray-300"></div>
          <div className="absolute bottom-1 left-4 w-8 h-3/4 bg-gray-200 rounded"></div>
          <div className="absolute bottom-1 left-16 w-8 h-1/2 bg-gray-200 rounded"></div>
          <div className="absolute bottom-1 left-28 w-8 h-2/3 bg-gray-200 rounded"></div>
          <div className="absolute bottom-1 left-40 w-8 h-1/3 bg-gray-200 rounded"></div>
          <div className="absolute bottom-1 left-52 w-8 h-5/6 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="h-2 bg-gray-200 rounded w-4"></div>
          <div className="h-2 bg-gray-200 rounded w-4"></div>
          <div className="h-2 bg-gray-200 rounded w-4"></div>
          <div className="h-2 bg-gray-200 rounded w-4"></div>
          <div className="h-2 bg-gray-200 rounded w-4"></div>
        </div>
      </div>
    </div>
  );
}
