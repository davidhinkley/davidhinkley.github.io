import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const ZoomableImage = ({ src, alt, className = '', style = {}, onLoad, ...props }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  
  const toggleZoom = (e) => {
    // Stop event propagation to prevent any parent handlers from firing
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragEnd = () => {
    // Use setTimeout to ensure the click event doesn't fire immediately after drag
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };
  
  const handleImageClick = (e) => {
    // Only close the image if we're not dragging
    if (!isDragging) {
      toggleZoom(e);
    }
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} 
      ref={constraintsRef}
      onClick={toggleZoom}
      style={{ ...style }}
    >
      {isZoomed ? (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleImageClick}
        >
          <motion.div
            className="relative"
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            // Don't stop propagation here, let the click event bubble up to close the image
          >
            <motion.img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onLoad={onLoad}
              onClick={(e) => {
                // Prevent the click from bubbling up if we're dragging
                if (isDragging) {
                  e.stopPropagation();
                }
              }}
              {...props}
            />
            <div className="absolute top-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
              Click and drag to move • Scroll to zoom • Click to close
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`transition-transform duration-200 hover:scale-[1.03] ${className}`}
          onLoad={onLoad}
          onClick={toggleZoom} // Add click handler directly to the image
          {...props}
        />
      )}
    </div>
  );
};

export default ZoomableImage;