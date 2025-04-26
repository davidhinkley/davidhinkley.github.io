/**
 * This script ensures that the database state is properly loaded and saved.
 * It should be run before starting the server.
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const uploadsDir = path.join(__dirname, 'uploads');

console.log('Checking database state...');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Check if db.json exists and is valid
let dbExists = false;
if (fs.existsSync(dbPath)) {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    if (data && data.trim() !== '') {
      const parsedData = JSON.parse(data);
      if (parsedData && parsedData.users && parsedData.photos) {
        console.log('Database state is valid.');
        
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
          console.log('Running download-images.js to restore sample images...');
          
          try {
            require('./download-images');
          } catch (error) {
            console.error('Error running download-images.js:', error);
          }
        }
        
        dbExists = true;
      } else {
        console.error('Invalid database state format in db.json');
      }
    } else {
      console.error('Empty db.json file');
    }
  } catch (error) {
    console.error('Error reading db.json:', error);
  }
}

if (!dbExists) {
  console.log('No valid database state found. The server will initialize with default data.');
}

console.log('Database state check complete.');