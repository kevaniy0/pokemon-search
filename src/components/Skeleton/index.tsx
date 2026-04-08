import { limitPerPage } from '@/services/pokemonAPI';

const skeletonCount = limitPerPage;
const SkeletonCard = () => {
  return (
    <div className="relative card-wrapper">
      <div
        className="
        font-bold w-25 h-25 lg:w-50 lg:h-50
        flex flex-col justify-center items-center
        border-2 border-xDark dark:border-xLight
        rounded-2xl cursor-pointer
        bg-gray-200 dark:bg-gray-700 animate-pulse
      "
      >
        <div className="w-15 h-15 lg:w-30 lg:h-30 bg-gray-300 dark:bg-gray-600 rounded-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 mt-2" />
      </div>
      <div className="absolute left-3 top-3 w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-sm" />
    </div>
  );
};

export const SkeletonCardList = () => {
  return (
    <div
      data-testid="skeleton-card-list-test"
      className="relative cards-wrapper flex font-medium text-gray-600"
    >
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center w-max mx-auto">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <li key={index} className="flex flex-col items-center w-max">
            <SkeletonCard />
          </li>
        ))}
      </ul>
    </div>
  );
};
