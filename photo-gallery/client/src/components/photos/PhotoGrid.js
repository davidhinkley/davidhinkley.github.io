import React from 'react';
import PhotoCard from './PhotoCard';

const PhotoGrid = ({ photos, onLike, onDelete, currentUserId }) => {
  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-500">No photos found</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <PhotoCard 
          key={photo.id} 
          photo={photo} 
          onLike={onLike} 
          onDelete={onDelete} 
          currentUserId={currentUserId} 
        />
      ))}
    </div>
  );
};

export default PhotoGrid;