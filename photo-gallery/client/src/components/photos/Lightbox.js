import React, { useEffect, useState } from 'react';

const Lightbox = ({ photo, onClose }) => {
  const [imageOrientation, setImageOrientation] = useState('square');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Add event listener for escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Prevent scrolling on body when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
  };

  return (
    <div 
      className="lightbox fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div className="relative max-w-5xl mx-auto">
        <button
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 z-10"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div className="relative h-[85vh] w-[85vw] max-w-5xl flex items-center justify-center">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
            </div>
          )}
          
          <img 
            src={photo.path} 
            alt={photo.title} 
            className={`
              rounded-lg shadow-xl transition-opacity duration-300
              ${imageOrientation === 'portrait' ? 'h-auto w-full max-h-[85vh] object-contain' : ''}
              ${imageOrientation === 'landscape' ? 'w-auto h-full max-w-[85vw] object-contain' : ''}
              ${imageOrientation === 'square' ? 'max-h-[85vh] max-w-[85vw] object-contain' : ''}
              ${!imageLoaded ? 'opacity-0' : 'opacity-100'}
            `}
            onLoad={handleImageLoad}
          />
        </div>
        
        <div className="bg-black bg-opacity-75 text-white p-4 rounded-b-lg">
          <h3 className="text-xl font-semibold">{photo.title}</h3>
          {photo.description && (
            <p className="text-gray-300 mt-1">{photo.description}</p>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-400">
              Category: {photo.category.charAt(0).toUpperCase() + photo.category.slice(1)}
            </span>
            <div className="flex items-center">
              <svg 
                className="w-5 h-5 text-red-500 mr-1" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                  clipRule="evenodd"
                />
              </svg>
              <span>{photo.likes || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;