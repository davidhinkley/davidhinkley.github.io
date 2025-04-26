/**
 * This script fixes the persistence issue by ensuring that the database state is preserved
 * between server restarts.
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const uploadsDir = path.join(__dirname, 'uploads');

console.log('Fixing persistence issue...');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Check if db.json exists
if (!fs.existsSync(dbPath)) {
  console.log('db.json does not exist. Creating a new one with default data...');
  
  // Create a default database state
  const defaultDb = {
    users: [
      {
        id: '1234567890',
        username: 'testuser',
        email: 'test@example.com',
        password: '$2a$10$XQxBJQzxPq.XzF0QYzDRyOXgV0L8QjQdy5zxJqPtKYWJKPo5pOaVO', // password123
        createdAt: new Date()
      }
    ],
    photos: [
      {
        id: '1',
        title: 'Beautiful Sunset',
        description: 'A stunning sunset over the ocean.\n\nThe golden light reflects off the water creating a magical atmosphere.',
        category: 'nature',
        attribution: 'Photo by John Smith on Unsplash',
        path: '/uploads/sunset.jpg',
        filename: 'sunset.jpg',
        likes: 15,
        userId: '1234567890',
        uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        id: '2',
        title: 'Mountain Landscape',
        description: 'Majestic mountains with snow caps.\n\nTaken during a hiking trip in the Alps last summer.',
        category: 'landscape',
        path: '/uploads/mountains.jpg',
        filename: 'mountains.jpg',
        likes: 8,
        userId: '1234567890',
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        id: '3',
        title: 'City Skyline',
        description: 'Urban skyline at night with lights.\n\nThe city comes alive after dark with thousands of twinkling lights.',
        category: 'urban',
        attribution: 'Photo by Jane Doe on Pixabay',
        path: '/uploads/city.jpg',
        filename: 'city.jpg',
        likes: 12,
        userId: '1234567890',
        uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    ]
  };
  
  // Write the default database state to db.json
  fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2));
  console.log('Created db.json with default data.');
  
  // Download sample images
  console.log('Downloading sample images...');
  try {
    require('./download-images');
  } catch (error) {
    console.error('Error downloading sample images:', error);
  }
} else {
  console.log('db.json already exists. Checking if it\'s valid...');
  
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const parsedData = JSON.parse(data);
    
    if (parsedData && parsedData.users && parsedData.photos) {
      console.log('db.json is valid.');
      
      // Check if all photo files exist
      const missingFiles = [];
      parsedData.photos.forEach(photo => {
        const photoPath = path.join(uploadsDir, photo.filename);
        if (!fs.existsSync(photoPath)) {
          missingFiles.push(photo.filename);
        }
      });
      
      if (missingFiles.length > 0) {
        console.log(`Warning: ${missingFiles.length} photo files are missing from the uploads directory:`);
        missingFiles.forEach(file => console.log(`  - ${file}`));
        
        // Check if any of the missing files are sample images
        const sampleImages = ['sunset.jpg', 'mountains.jpg', 'city.jpg'];
        const missingSampleImages = missingFiles.filter(file => sampleImages.includes(file));
        
        if (missingSampleImages.length > 0) {
          console.log('Downloading missing sample images...');
          try {
            require('./download-images');
          } catch (error) {
            console.error('Error downloading sample images:', error);
          }
        }
      }
    } else {
      console.error('Invalid database state format in db.json');
    }
  } catch (error) {
    console.error('Error reading db.json:', error);
  }
}

console.log('\nPersistence fix complete. Now when you run the server, your uploaded images should be preserved.');
console.log('To start the server, run: npm run start');