import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [userPhotos, setUserPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        const res = await axios.get('/api/photos');
        // Filter photos by current user
        const photos = res.data.filter(photo => photo.userId === currentUser.id);
        setUserPhotos(photos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user photos:', error);
        setLoading(false);
      }
    };
    
    fetchUserPhotos();
  }, [currentUser.id]);
  
  const handleLike = async (id) => {
    if (!isAuthenticated) {
      alert('Please log in to like photos');
      return;
    }
    
    // Find the photo in our state
    const photo = userPhotos.find(p => p.id === id);
    
    // If already liked, don't do anything
    if (photo && photo.liked) {
      return;
    }
    
    try {
      const res = await axios.post(`/api/photos/${id}/like`);
      setUserPhotos(
        userPhotos.map((photo) =>
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
    if (window.confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/photos/${id}`);
        // Remove the deleted photo from the state
        setUserPhotos(userPhotos.filter(photo => photo.id !== id));
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };
  
  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete ALL your photos? This action cannot be undone.')) {
      try {
        // Delete each photo one by one
        const deletePromises = userPhotos.map(photo => 
          axios.delete(`/api/photos/${photo.id}`)
        );
        
        await Promise.all(deletePromises);
        setUserPhotos([]);
      } catch (error) {
        console.error('Error deleting all photos:', error);
      }
    }
  };
  
  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Profile</h1>
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mb-4 md:mb-0 md:mr-6">
            {currentUser.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{currentUser.username}</h2>
            <p className="text-gray-600 dark:text-gray-400">{currentUser.email}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Photos</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
          </div>
        ) : userPhotos.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Your Photos ({userPhotos.length})</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleDeleteAll}
                  className="btn btn-danger btn-sm flex items-center"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete All
                </button>
                <Link to="/upload" className="btn btn-primary btn-sm">
                  Upload New
                </Link>
              </div>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {userPhotos.map(photo => (
                <li key={photo.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 mr-4 relative overflow-hidden rounded">
                      <img 
                        src={photo.path} 
                        alt={photo.title} 
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    </div>
                    <div>
                      <Link to={`/photos/${photo.id}`} className="text-lg font-medium hover:text-primary-600 dark:hover:text-primary-400">
                        {photo.title}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Category: {photo.category} • {photo.likes} likes
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link 
                      to={`/photos/${photo.id}`} 
                      className="btn btn-secondary btn-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="btn btn-danger btn-sm flex items-center"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">You haven't uploaded any photos yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start sharing your photos with the world!</p>
            <Link to="/upload" className="btn btn-primary">
              Upload Your First Photo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;