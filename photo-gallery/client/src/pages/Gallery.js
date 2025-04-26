import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoGrid from '../components/photos/PhotoGrid';
import PhotoFilter from '../components/photos/PhotoFilter';
import { useAuth } from '../context/AuthContext';

const Gallery = () => {
  const { currentUser } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get('/api/photos');
        setPhotos(res.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(photo => photo.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

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
    try {
      const res = await axios.post(`/api/photos/${id}/like`);
      
      // Update both photos arrays
      setPhotos(
        photos.map((photo) =>
          photo.id === id ? { ...photo, likes: res.data.likes } : photo
        )
      );
      
      setFilteredPhotos(
        filteredPhotos.map((photo) =>
          photo.id === id ? { ...photo, likes: res.data.likes } : photo
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
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
        </div>
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