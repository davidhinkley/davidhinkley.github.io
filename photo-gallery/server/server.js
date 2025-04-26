require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/auth');
const photoRoutes = require('./routes/photos');
const backupRoutes = require('./routes/backups');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/backups', backupRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Photo Gallery API is running');
});

// Connect to MongoDB (commented out for now)
/*
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));
*/

// For demo purposes, we'll use in-memory storage
const bcrypt = require('bcryptjs');

// Create a default test account
const createDefaultUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);
  
  return {
    id: '1234567890',
    username: 'admin',
    email: 'david@hinkley.ca',
    password: hashedPassword,
    isAdmin: true,
    createdAt: new Date()
  };
};

// Create photos from actual files in uploads directory
const createPhotosFromUploads = (userId, uploadsDirectory) => {
  // Get all image files from the uploads directory
  let imageFiles = [];
  try {
    if (fs.existsSync(uploadsDirectory)) {
      imageFiles = fs.readdirSync(uploadsDirectory)
        .filter(file => {
          // Filter for image files only
          const ext = path.extname(file).toLowerCase();
          // Skip sample images
          if (['sunset.jpg', 'mountains.jpg', 'city.jpg'].includes(file)) {
            return false;
          }
          return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });
      console.log(`Found ${imageFiles.length} image files in uploads directory`);
    } else {
      console.log('Uploads directory does not exist, creating it...');
      fs.mkdirSync(uploadsDirectory, { recursive: true });
    }
  } catch (error) {
    console.error('Error reading uploads directory:', error);
    return [];
  }

  // If no images found, return empty array
  if (imageFiles.length === 0) {
    console.log('No image files found in uploads directory');
    return [];
  }

  // Create photo objects from the image files
  return imageFiles.map((filename, index) => {
    // Generate a title from the filename
    const nameWithoutExt = path.basename(filename, path.extname(filename));
    const title = nameWithoutExt
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: (index + 1).toString(),
      title: title,
      description: `Description for ${title}`,
      category: 'uncategorized',
      path: `/uploads/${filename}`,
      filename: filename,
      likes: Math.floor(Math.random() * 20),
      userId: userId,
      uploadDate: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)) // Staggered upload dates
    };
  });
};

// Initialize database with default user and photos
const initializeDb = async (uploadsDirectory) => {
  const defaultUser = await createDefaultUser();
  const photos = createPhotosFromUploads(defaultUser.id, uploadsDirectory);
  
  const db = {
    users: [defaultUser],
    photos: photos
  };
  
  global.db = db;
  console.log('Default admin user created:', defaultUser.username, '/', defaultUser.email);
  console.log('Photos added from uploads directory:', photos.length);
};

// Function to save database state to file
const saveDbState = () => {
  try {
    if (!global.db || !global.db.users || !global.db.photos) {
      console.error('Cannot save database state: Invalid database structure');
      return;
    }
    
    const dbPath = path.join(__dirname, 'db.json');
    const tempPath = path.join(__dirname, 'db.json.tmp');
    
    // Write to a temporary file first to avoid corruption if the process is interrupted
    fs.writeFileSync(tempPath, JSON.stringify(global.db, null, 2));
    
    // Rename the temporary file to the actual file (atomic operation)
    fs.renameSync(tempPath, dbPath);
    
    console.log('Database state saved to file');
  } catch (error) {
    console.error('Error saving database state:', error);
  }
};

// Make saveDbState globally available
global.saveDbState = saveDbState;

// Ensure uploads directory exists and is properly set up
const setupUploadsDirectory = () => {
  try {
    const uploadsDir = path.join(__dirname, 'uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('Created uploads directory');
    }
    
    // Check if the directory is writable
    try {
      const testFile = path.join(uploadsDir, '.write-test');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
    } catch (writeError) {
      console.error('Warning: Uploads directory is not writable:', writeError);
      console.error('You may need to change the permissions of the directory.');
    }
    
    return uploadsDir;
  } catch (error) {
    console.error('Error setting up uploads directory:', error);
    throw error;
  }
};

// Function to load database state from file
const loadDbState = () => {
  try {
    const dbPath = path.join(__dirname, 'db.json');
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      if (data && data.trim() !== '') {
        const parsedData = JSON.parse(data);
        if (parsedData && parsedData.users && parsedData.photos) {
          global.db = parsedData;
          console.log('Database state loaded from file');
          return true;
        } else {
          console.error('Invalid database state format in db.json');
        }
      } else {
        console.error('Empty db.json file');
      }
    } else {
      console.log('No db.json file found, will initialize with default data');
    }
    return false;
  } catch (error) {
    console.error('Error loading database state:', error);
    return false;
  }
};

// Function to ensure all photos in the database have corresponding files
const ensurePhotoFiles = () => {
  if (!global.db || !global.db.photos) {
    return;
  }
  
  const missingFiles = [];
  
  global.db.photos.forEach(photo => {
    const photoPath = path.join(uploadsDir, photo.filename);
    if (!fs.existsSync(photoPath)) {
      missingFiles.push(photo.filename);
    }
  });
  
  if (missingFiles.length > 0) {
    console.log(`Warning: ${missingFiles.length} photo files are missing from the uploads directory:`);
    missingFiles.forEach(file => console.log(`  - ${file}`));
    console.log('You may need to restore these files or remove them from the database.');
    
    // Remove missing photos from the database
    global.db.photos = global.db.photos.filter(photo => !missingFiles.includes(photo.filename));
    console.log(`Removed ${missingFiles.length} missing photos from the database.`);
    
    // Save the updated database state
    if (typeof global.saveDbState === 'function') {
      global.saveDbState();
    }
  }
};

// Initialize the database
const initDb = async (uploadsDirectory) => {
  // First try to load existing database state
  if (loadDbState()) {
    console.log('Successfully loaded existing database state');
    // If we loaded the database state, ensure all photo files exist
    ensurePhotoFiles();
    return;
  }
  
  console.log('Could not load database state, initializing with default data');
  
  // Only initialize with default data if we couldn't load from file
  try {
    await initializeDb(uploadsDirectory);
    // Save initial state
    saveDbState();
    console.log('Database initialized with default data');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Set up uploads directory
const uploadsDir = setupUploadsDirectory();

// Log the application paths for debugging
console.log(`Application root directory: ${__dirname}`);
console.log(`Uploads directory: ${uploadsDir}`);
console.log(`Database path: ${path.join(__dirname, 'db.json')}`);

// Check if this is the first run or if we should preserve the database
const dbPath = path.join(__dirname, 'db.json');
const isFirstRun = !fs.existsSync(dbPath) || process.env.FORCE_REINIT === 'true';

if (isFirstRun) {
  console.log('First run detected or forced reinitialization requested');
} else {
  console.log('Existing database found, will use it instead of reinitializing');
}

// Only delete sample images if this is the first run or forced reinitialization
if (isFirstRun) {
  const sampleImages = ['sunset.jpg', 'mountains.jpg', 'city.jpg'];
  sampleImages.forEach(img => {
    const imgPath = path.join(uploadsDir, img);
    if (fs.existsSync(imgPath)) {
      try {
        fs.unlinkSync(imgPath);
        console.log(`Deleted sample image ${img}`);
      } catch (error) {
        console.error(`Error deleting sample image ${img}:`, error);
      }
    }
  });
}

// Run database initialization
initDb(uploadsDir);

// Register shutdown handlers to save database state
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT signal. Saving database state before exit...');
  saveDbState();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM signal. Saving database state before exit...');
  saveDbState();
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  saveDbState();
  process.exit(1);
});

// Start server with port fallback
const startServer = (port) => {
  const server = app.listen(port)
    .on('listening', () => {
      console.log(`Server running on port ${port}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use, trying port ${port + 1}...`);
        server.close();
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
    
  // Save database state periodically (every 5 minutes)
  setInterval(() => {
    saveDbState();
  }, 5 * 60 * 1000);
};

startServer(PORT);