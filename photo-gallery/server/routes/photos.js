const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// JWT Secret (should be in .env file in production)
const JWT_SECRET = 'your_jwt_secret';

// Get the uploads directory path
const uploadsDir = path.join(__dirname, '../uploads');
// Directory creation is now handled in server.js

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Auth middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all photos
router.get('/', async (req, res) => {
  try {
    const photos = global.db.photos;
    
    // Check if user has liked any photos (if authenticated)
    let userId = null;
    const token = req.header('x-auth-token');
    
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        // Invalid token, but we'll still return photos without liked status
      }
    }
    
    // If user is authenticated and userLikes exists, mark photos as liked
    let photosWithLikedStatus = photos;
    if (userId && global.db.userLikes) {
      photosWithLikedStatus = photos.map(photo => {
        const liked = global.db.userLikes.some(
          like => like.userId === userId && like.photoId === photo.id
        );
        return { ...photo, liked };
      });
    }
    
    res.json(photosWithLikedStatus);
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get photo by ID
router.get('/:id', async (req, res) => {
  try {
    const photo = global.db.photos.find(photo => photo.id === req.params.id);
    
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    
    // Check if user has liked this photo (if authenticated)
    let liked = false;
    const token = req.header('x-auth-token');
    
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        
        // Check if userLikes array exists and if user has liked this photo
        if (global.db.userLikes) {
          liked = global.db.userLikes.some(
            like => like.userId === userId && like.photoId === req.params.id
          );
        }
      } catch (err) {
        // Invalid token, but we'll still return the photo without liked status
      }
    }
    
    res.json({
      ...photo,
      liked
    });
  } catch (error) {
    console.error('Get photo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload a new photo
router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const { title, description, category, attribution } = req.body;
    
    const newPhoto = {
      id: Date.now().toString(),
      title: title || 'Untitled',
      description: description || '',
      category: category || 'uncategorized',
      attribution: attribution || '',
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      userId: req.user.id,
      uploadDate: new Date(),
      likes: 0
    };
    
    global.db.photos.push(newPhoto);
    
    // Save database state
    if (typeof global.saveDbState === 'function') {
      global.saveDbState();
    }
    
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error('Upload photo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update photo details
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, category, attribution } = req.body;
    
    const photoIndex = global.db.photos.findIndex(photo => photo.id === req.params.id);
    
    if (photoIndex === -1) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    
    // Check if user owns the photo
    if (global.db.photos[photoIndex].userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this photo' });
    }
    
    // Update photo
    global.db.photos[photoIndex] = {
      ...global.db.photos[photoIndex],
      title: title || global.db.photos[photoIndex].title,
      description: description || global.db.photos[photoIndex].description,
      category: category || global.db.photos[photoIndex].category,
      attribution: attribution !== undefined ? attribution : global.db.photos[photoIndex].attribution,
      updatedAt: new Date()
    };
    
    // Save database state
    if (typeof global.saveDbState === 'function') {
      global.saveDbState();
    }
    
    res.json(global.db.photos[photoIndex]);
  } catch (error) {
    console.error('Update photo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete photo
router.delete('/:id', auth, async (req, res) => {
  try {
    const photoIndex = global.db.photos.findIndex(photo => photo.id === req.params.id);
    
    if (photoIndex === -1) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    
    // Check if user owns the photo
    if (global.db.photos[photoIndex].userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this photo' });
    }
    
    // Delete file from filesystem
    const filePath = path.join(uploadsDir, global.db.photos[photoIndex].filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Remove from database
    global.db.photos.splice(photoIndex, 1);
    
    // Save database state
    if (typeof global.saveDbState === 'function') {
      global.saveDbState();
    }
    
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like a photo
router.post('/:id/like', auth, async (req, res) => {
  try {
    const photoIndex = global.db.photos.findIndex(photo => photo.id === req.params.id);
    
    if (photoIndex === -1) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    
    const userId = req.user.id;
    const photoId = req.params.id;
    
    // Initialize userLikes array if it doesn't exist
    if (!global.db.userLikes) {
      global.db.userLikes = [];
    }
    
    // Check if user has already liked this photo
    const existingLike = global.db.userLikes.find(
      like => like.userId === userId && like.photoId === photoId
    );
    
    if (existingLike) {
      // User has already liked this photo
      return res.json({ 
        likes: global.db.photos[photoIndex].likes,
        alreadyLiked: true
      });
    }
    
    // Add user like to the database
    global.db.userLikes.push({
      userId,
      photoId,
      timestamp: new Date()
    });
    
    // Increment likes
    global.db.photos[photoIndex].likes += 1;
    
    // Save database state
    if (typeof global.saveDbState === 'function') {
      global.saveDbState();
    }
    
    res.json({ 
      likes: global.db.photos[photoIndex].likes,
      alreadyLiked: true
    });
  } catch (error) {
    console.error('Like photo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;