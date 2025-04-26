import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HeartIcon, ArrowLeftIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import ProgressiveImage from '../components/photos/ProgressiveImage';
import ZoomableImage from '../components/photos/ZoomableImage';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAttribution, setShowAttribution] = useState(false);
  const [imageOrientation, setImageOrientation] = useState('square');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    attribution: ''
  });

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await axios.get(`/api/photos/${id}`);
        setPhoto(res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          attribution: res.data.attribution || ''
        });
        setShowAttribution(!!res.data.attribution);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photo:', error);
        setError('Photo not found or error loading photo');
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

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

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please log in to like photos');
      return;
    }
    
    // If already liked, don't do anything
    if (photo.liked) {
      return;
    }
    
    try {
      const res = await axios.post(`/api/photos/${id}/like`);
      setPhoto({ 
        ...photo, 
        likes: res.data.likes,
        liked: true
      });
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/photos/${id}`);
        navigate('/gallery');
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/photos/${id}`, formData);
      setPhoto(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
        <Link to="/gallery" className="btn btn-primary">
          Back to Gallery
        </Link>
      </div>
    );
  }

  const isOwner = isAuthenticated && currentUser && photo.userId === currentUser.id;

  return (
    <div>
      <div className="mb-6">
        <Link to="/gallery" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Gallery
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/3 relative h-[500px]">
            <div className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center">
              <MagnifyingGlassIcon className="h-4 w-4 mr-1" />
              Click image to zoom
            </div>
            <div className="absolute inset-0">
              {/* Only show the ProgressiveImage during loading */}
              {!imageLoaded && (
                <ProgressiveImage
                  src={photo.path}
                  // Generate a low-quality placeholder by adding a size parameter to the URL
                  // This assumes your backend supports image resizing via URL parameters
                  placeholderSrc={`${photo.path}?width=50`}
                  alt={photo.title}
                  style={{ 
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    zIndex: 5
                  }}
                  onLoad={handleImageLoad}
                />
              )}
              
              {/* ZoomableImage is the main component that handles the zoom functionality */}
              <ZoomableImage
                src={photo.path}
                alt={photo.title}
                className={`
                  ${imageOrientation === 'portrait' ? 'h-auto w-full max-h-[500px] object-contain' : ''}
                  ${imageOrientation === 'landscape' ? 'w-auto h-full max-w-full object-contain' : ''}
                  ${imageOrientation === 'square' ? 'max-h-[500px] max-w-full object-contain' : ''}
                `}
                style={{ 
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  width: '100%',
                  height: '100%'
                }}
                onLoad={handleImageLoad}
              />
            </div>
          </div>
          <div className="md:w-1/3 p-6 dark:text-white">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="category">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input h-32"
                    placeholder="Enter a description for your photo..."
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showAttribution"
                      checked={showAttribution}
                      onChange={() => setShowAttribution(!showAttribution)}
                      className="mr-2"
                    />
                    <label className="text-gray-700 dark:text-gray-200 text-sm font-bold" htmlFor="showAttribution">
                      Attribution
                    </label>
                  </div>
                </div>
                
                {showAttribution && (
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="attribution">
                      Attribution
                    </label>
                    <textarea
                      id="attribution"
                      name="attribution"
                      value={formData.attribution}
                      onChange={handleChange}
                      className="input h-20"
                      placeholder="Credit the original creator or source of this image..."
                    ></textarea>
                  </div>
                )}
                <div className="flex space-x-2">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{photo.title}</h1>
                  <button
                    onClick={handleLike}
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    {photo.liked ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                    <span className="ml-1">{photo.likes}</span>
                  </button>
                </div>
                
                <div className="mb-4">
                  <div>
                    <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      #{photo.category}
                    </span>
                    {photo.attribution && (
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {photo.attribution}
                      </div>
                    )}
                  </div>
                </div>
                
                {photo.description && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Description</h2>
                    <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{photo.description}</div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Details</h2>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>Uploaded on {new Date(photo.uploadDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {isOwner && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-secondary flex items-center"
                    >
                      <PencilIcon className="h-5 w-5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn btn-danger flex items-center"
                    >
                      <TrashIcon className="h-5 w-5 mr-1" />
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;