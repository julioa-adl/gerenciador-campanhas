export default function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      {/* Exemplo de skeleton para lista de campanhas */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
