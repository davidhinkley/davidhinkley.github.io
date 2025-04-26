/**
 * Simple script to check if db.json exists and what it contains
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

console.log('Checking if db.json exists...');

if (fs.existsSync(dbPath)) {
  console.log('db.json exists!');
  
  try {
    const stats = fs.statSync(dbPath);
    console.log(`File size: ${stats.size} bytes`);
    console.log(`Last modified: ${stats.mtime}`);
    
    const data = fs.readFileSync(dbPath, 'utf8');
    const parsedData = JSON.parse(data);
    
    console.log('Database content summary:');
    console.log(`- Users: ${parsedData.users ? parsedData.users.length : 0}`);
    console.log(`- Photos: ${parsedData.photos ? parsedData.photos.length : 0}`);
    
    if (parsedData.photos && parsedData.photos.length > 0) {
      console.log('\nPhoto filenames:');
      parsedData.photos.forEach(photo => {
        console.log(`- ${photo.filename} (uploaded by user ${photo.userId})`);
      });
    }
  } catch (error) {
    console.error('Error reading db.json:', error);
  }
} else {
  console.log('db.json does not exist!');
}

// Check uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
console.log('\nChecking uploads directory...');

if (fs.existsSync(uploadsDir)) {
  console.log('Uploads directory exists!');
  
  try {
    const files = fs.readdirSync(uploadsDir);
    console.log(`Found ${files.length} files in uploads directory:`);
    
    files.forEach(file => {
      const stats = fs.statSync(path.join(uploadsDir, file));
      console.log(`- ${file} (${stats.size} bytes)`);
    });
  } catch (error) {
    console.error('Error reading uploads directory:', error);
  }
} else {
  console.log('Uploads directory does not exist!');
}