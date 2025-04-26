import React from 'react';

export const PhotoCardSkeleton = () => {
  return (
    <div className="card group bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-colors duration-200 animate-pulse">
      <div className="relative overflow-hidden h-64 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="w-3/4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
          </div>
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export const PhotoGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(count).fill(0).map((_, index) => (
        <PhotoCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default PhotoGridSkeleton;