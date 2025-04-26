import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PhotoGrid from '../components/photos/PhotoGrid';
import { PhotoGridSkeleton } from '../components/ui/SkeletonLoader';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [featuredPhotos, setFeaturedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPhotos = async () => {
      try {
        const res = await axios.get('/api/photos');
        
        // Check if there are any liked photos
        const likedPhotos = res.data.filter(photo => photo.liked);
        
        let photosToShow;
        if (likedPhotos.length > 0) {
          // If there are liked photos, only show those sorted by likes
          photosToShow = [...likedPhotos].sort((a, b) => b.likes - a.likes);
        } else {
          // Otherwise, show the 8 most liked photos (current behavior)
          photosToShow = [...res.data].sort((a, b) => b.likes - a.likes).slice(0, 8);
        }
        
        setFeaturedPhotos(photosToShow);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured photos:', error);
        setLoading(false);
      }
    };
    

    fetchFeaturedPhotos();
  }, []);

  const handleLike = async (id) => {
    if (!isAuthenticated) {
      alert('Please log in to like photos');
      return;
    }
    
    // Find the photo in our state
    const photo = featuredPhotos.find(p => p.id === id);
    
    // If already liked, don't do anything
    if (photo && photo.liked) {
      return;
    }
    
    try {
      const res = await axios.post(`/api/photos/${id}/like`);
      setFeaturedPhotos(
        featuredPhotos.map((photo) =>
          photo.id === id ? { 
            ...photo, 
            likes: res.data.likes,
            liked: true
          } : photo
        )
      );
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/photos/${id}`);
      
      // Remove the deleted photo from the featured photos
      setFeaturedPhotos(featuredPhotos.filter(photo => photo.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 dark:bg-[#051E36] dark:bg-none text-white py-16 rounded-lg mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl galleria-title mb-4">
            Galleria
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Capture and Share Your Moments
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            A beautiful gallery to showcase your photography. Upload, organize, and share your
            favorite photos with the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/gallery" className="btn bg-white text-primary-700 hover:bg-gray-100">
              Browse Gallery
            </Link>
            <Link to="/upload" className="btn bg-primary-500 text-white hover:bg-primary-600 border border-white">
              Upload Photos
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Photos Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl galleria-title">Featured Photos</h2>
          <Link to="/gallery" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
            View All →
          </Link>
        </div>
        
        {loading ? (
          <PhotoGridSkeleton count={8} />
        ) : (
          <PhotoGrid 
            photos={featuredPhotos} 
            onLike={handleLike} 
            onDelete={handleDelete}
            currentUserId={currentUser?.id}
          />
        )}
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl galleria-title mb-6 text-center">Why Choose Galleria</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#051E36] p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Beautiful Display</h3>
            <p className="text-gray-600 dark:text-white">
              Showcase your photos in a responsive, grid-based layout that looks great on any device.
            </p>
          </div>
          <div className="bg-white dark:bg-[#051E36] p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Easy Uploads</h3>
            <p className="text-gray-600 dark:text-white">
              Quickly upload your photos, add descriptions, and organize them into categories.
            </p>
          </div>
          <div className="bg-white dark:bg-[#051E36] p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Social Sharing</h3>
            <p className="text-gray-600 dark:text-white">
              Share your photos with friends and family, and let them like and comment on your work.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 dark:bg-[#051E36] p-8 rounded-lg text-center">
        <h2 className="text-3xl galleria-title mb-4">Ready to Start Sharing?</h2>
        <p className="text-gray-600 dark:text-white mb-6 max-w-2xl mx-auto">
          Join our community of photographers and start showcasing your work today.
        </p>
        <Link to="/register" className="btn btn-primary">
          Create an Account
        </Link>
      </section>
    </div>
  );
};

export default Home;