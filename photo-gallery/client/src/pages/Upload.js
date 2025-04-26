import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import imageCompression from 'browser-image-compression';

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    attribution: '',
  });
  const [showAttribution, setShowAttribution] = useState(false);
  const [file, setFile] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [compressionInfo, setCompressionInfo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      setOriginalFile(selectedFile);
      
      // Create preview immediately for better UX
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      
      try {
        // Set compression options
        const options = {
          maxSizeMB: 1, // Max file size in MB
          maxWidthOrHeight: 1920, // Max width/height in pixels
          useWebWorker: true,
          initialQuality: 0.8, // Initial quality setting (0-1)
        };
        
        // Show loading state
        setLoading(true);
        
        // Compress the image
        const compressedFile = await imageCompression(selectedFile, options);
        
        // Calculate compression ratio
        const originalSizeMB = selectedFile.size / (1024 * 1024);
        const compressedSizeMB = compressedFile.size / (1024 * 1024);
        const savingsPercent = ((originalSizeMB - compressedSizeMB) / originalSizeMB * 100).toFixed(1);
        
        setCompressionInfo({
          originalSize: originalSizeMB.toFixed(2),
          compressedSize: compressedSizeMB.toFixed(2),
          savings: savingsPercent
        });
        
        // Set the compressed file for upload
        setFile(compressedFile);
        setLoading(false);
      } catch (error) {
        console.error('Error compressing image:', error);
        // Fallback to original file if compression fails
        setFile(selectedFile);
        setError('Image compression failed. The original image will be used.');
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const data = new FormData();
    data.append('photo', file);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (showAttribution && formData.attribution) {
      data.append('attribution', formData.attribution);
    }
    
    try {
      const res = await axios.post('/api/photos', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      navigate(`/photos/${res.data.id}`);
    } catch (error) {
      console.error('Error uploading photo:', error);
      setError(error.response?.data?.message || 'Error uploading photo');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Photo</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
              Photo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              {preview ? (
                <div className="mb-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto"
                  />
                  {compressionInfo && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                      <p>Original: {compressionInfo.originalSize} MB</p>
                      <p>Compressed: {compressionInfo.compressedSize} MB</p>
                      <p>Saved: {compressionInfo.savings}% of original size</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 mb-4">
                  <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400" />
                  <p>Drag and drop your photo here, or click to select</p>
                  <p className="text-xs mt-2">Images will be automatically compressed for optimal performance</p>
                </div>
              )}
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('photo').click()}
                className="btn btn-secondary"
              >
                {preview ? 'Change Photo' : 'Select Photo'}
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
              placeholder="e.g. nature, portrait, architecture"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input h-32"
              placeholder="Tell us about your photo..."
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
              <label className="text-gray-700 text-sm font-bold" htmlFor="showAttribution">
                Attribution
              </label>
            </div>
          </div>
          
          {showAttribution && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attribution">
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
        </div>
        
        <div className="bg-gray-50 px-6 py-4">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              'Upload Photo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;