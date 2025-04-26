import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const PhotoCard = ({ photo, onLike, onDelete, currentUserId }) => {
  const { id, title, path, likes, category, attribution, userId } = photo;
  const [imageOrientation, setImageOrientation] = useState('square');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isOwner = currentUserId && userId === currentUserId;

  // Function to determine image orientation
  const checkImageOrientation = (img) => {
    if (img.naturalWidth && img.naturalHeight) {
      // Calculate aspect ratio
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      
      // Define thresholds for orientation
      if (aspectRatio < 0.9) {
        return 'portrait';
      } else if (aspectRatio > 1.1) {
        return 'landscape';
      } else {
        return 'square';
      }
    }
    return 'square'; // Default
  };

  // Handle image load
  const handleImageLoad = (e) => {
    const orientation = checkImageOrientation(e.target);
    setImageOrientation(orientation);
    setImageLoaded(true);
    setImageError(false);
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Stop showing loading spinner
  };

  // Handle delete
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      onDelete(id);
    }
  };

  return (
    <div className="card group bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-colors duration-200">
      <div className="relative overflow-hidden h-64">
        <Link to={`/photos/${id}`} className="block w-full h-full cursor-pointer z-10 relative">
          {!imageError ? (
            <img
              src={path}
              alt={title}
              className={`
                transition-transform duration-300 group-hover:scale-105
                ${imageOrientation === 'portrait' ? 'w-full h-auto object-cover object-center' : ''}
                ${imageOrientation === 'landscape' ? 'h-full w-auto object-cover object-center' : ''}
                ${imageOrientation === 'square' ? 'w-full h-full object-contain' : ''}
                ${!imageLoaded ? 'opacity-0' : 'opacity-100'}
              `}
              style={{ 
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-300">Image not available</p>
            </div>
          )}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800">
              <div className="w-8 h-8 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
            </div>
          )}
        </Link>
        <Link to={`/photos/${id}`} className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
          <span className="btn btn-primary px-4 py-2 rounded-md bg-primary-600 text-white">
            View Details
          </span>
        </Link>
        
        {/* Trash can icon for photo owner */}
        {isOwner && onDelete && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 p-2 bg-red-600 bg-opacity-70 hover:bg-opacity-100 text-white rounded-full transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-30"
            title="Delete photo"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
              <Link to={`/photos/${id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                {title}
              </Link>
            </h3>
            <div>
              <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-1">
                #{category}
              </span>
              {attribution && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {attribution}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => onLike(id)}
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
          >
            {photo.liked ? (
              <HeartIconSolid className="h-6 w-6 text-red-500 dark:text-red-400" />
            ) : (
              <HeartIcon className="h-6 w-6" />
            )}
            <span className="ml-1">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;