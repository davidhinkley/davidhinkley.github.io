import React, { useState, useEffect } from 'react';

/**
 * ProgressiveImage component that shows a blurred placeholder while the main image loads
 * 
 * @param {string} src - The source URL of the main image
 * @param {string} placeholderSrc - Optional placeholder image URL (if not provided, will use the main image with blur)
 * @param {string} alt - Alt text for the image
 * @param {function} onLoad - Optional callback function when image loads
 * @param {object} style - Optional style object
 * @param {string} className - Optional CSS class names
 */
const ProgressiveImage = ({ 
  src, 
  placeholderSrc, 
  alt, 
  onLoad, 
  style = {}, 
  className = '',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
  }, [src]);

  const handleImageLoad = (e) => {
    // When the main image is loaded
    setIsLoading(false);
    
    // Call the onLoad callback if provided
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Low quality placeholder image */}
      {isLoading && placeholderSrc && (
        <img
          src={placeholderSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 filter blur-sm scale-105"
          style={{
            opacity: isLoading ? 0.6 : 0,
          }}
        />
      )}
      
      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className={`
          transition-opacity duration-500 ease-in-out w-full h-full
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          objectFit: 'cover',
          ...style
        }}
        onLoad={handleImageLoad}
        onError={() => setIsLoading(false)}
        {...props}
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-t-2 border-primary-600 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;