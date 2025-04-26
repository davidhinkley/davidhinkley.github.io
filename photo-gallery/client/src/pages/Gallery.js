import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PhotoGrid from '../components/photos/PhotoGrid';
import PhotoFilter from '../components/photos/PhotoFilter';
import { PhotoGridSkeleton } from '../components/ui/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const Gallery = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);
  const PHOTOS_PER_PAGE = 12;

  // Function to fetch photos with pagination
  const fetchPhotos = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      // In a real API, you would have pagination parameters
      // For this example, we'll simulate pagination by slicing the data
      const res = await axios.get('/api/photos');
      const allPhotos = res.data;
      
      // Extract unique categories (only on first load)
      if (pageNum === 1) {
        const uniqueCategories = [...new Set(allPhotos.map(photo => photo.category))];
        setCategories(uniqueCategories);
      }
      
      // Simulate pagination
      const start = 0;
      const end = pageNum * PHOTOS_PER_PAGE;
      const paginatedPhotos = allPhotos.slice(start, end);
      
      // Check if we've reached the end
      const hasMore = paginatedPhotos.length < allPhotos.length;
      
      setPhotos(paginatedPhotos);
      setHasMorePhotos(hasMore);
      setLoading(false);
      
      return hasMore;
    } catch (error) {
      console.error('Error fetching photos:', error);
      setLoading(false);
      return false;
    }
  }, []);

  // Load more photos when scrolling
  const loadMorePhotos = useCallback(async (nextPage) => {
    if (!hasMorePhotos) return false;
    return await fetchPhotos(nextPage);
  }, [fetchPhotos, hasMorePhotos]);

  // Initialize infinite scroll
  const { isFetching } = useInfiniteScroll(loadMorePhotos, {
    threshold: 300,
    initialPage: 1,
    enabled: !loading && hasMorePhotos && !selectedCategory && !searchTerm
  });

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  useEffect(() => {
    // Filter photos based on category and search term
    let result = [...photos];
    
    if (selectedCategory) {
      result = result.filter(photo => photo.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        photo => 
          photo.title.toLowerCase().includes(term) || 
          photo.description.toLowerCase().includes(term) ||
          photo.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredPhotos(result);
  }, [photos, selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleLike = async (id) => {
    if (!isAuthenticated) {
      alert('Please log in to like photos');
      return;
    }
    
    // Find the photo in our state
    const photo = photos.find(p => p.id === id);
    
    // If already liked, don't do anything
    if (photo && photo.liked) {
      return;
    }
    
    try {
      const res = await axios.post(`/api/photos/${id}/like`);
      
      // Update both photos arrays
      setPhotos(
        photos.map((photo) =>
          photo.id === id ? { 
            ...photo, 
            likes: res.data.likes,
            liked: true
          } : photo
        )
      );
      
      setFilteredPhotos(
        filteredPhotos.map((photo) =>
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
      
      // Remove the deleted photo from both arrays
      setPhotos(photos.filter(photo => photo.id !== id));
      setFilteredPhotos(filteredPhotos.filter(photo => photo.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl galleria-title mb-2">Galleria</h1>
        <p className="text-dark-text-secondary">Browse and discover amazing photos from our community</p>
      </div>

      <PhotoFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
      />

      {loading ? (
        <PhotoGridSkeleton count={12} />
      ) : (
        <>
          <div className="mb-4 text-dark-text-secondary">
            Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
            {selectedCategory && <span> in <span className="text-primary-400 font-semibold">{selectedCategory}</span></span>}
            {searchTerm && <span> matching "<span className="text-primary-400 font-semibold">{searchTerm}</span>"</span>}
          </div>
          <PhotoGrid 
            photos={filteredPhotos} 
            onLike={handleLike} 
            onDelete={handleDelete}
            currentUserId={currentUser?.id}
          />
        </>
      )}
    </div>
  );
};

export default Gallery;