/**
 * Script to reset all photo likes to 0
 */

const fs = require('fs');
const path = require('path');

// Path to the database file
const dbPath = path.join(__dirname, 'db.json');

console.log('Resetting all photo likes to 0...');

try {
  // Check if db.json exists
  if (!fs.existsSync(dbPath)) {
    console.error('Error: db.json file not found!');
    process.exit(1);
  }

  // Read the database file
  const data = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(data);

  // Check if the database structure is valid
  if (!db || !db.photos || !Array.isArray(db.photos)) {
    console.error('Error: Invalid database structure!');
    process.exit(1);
  }

  // Count photos before resetting
  const photoCount = db.photos.length;
  console.log(`Found ${photoCount} photos in the database.`);

  // Reset likes for all photos
  let totalLikes = 0;
  db.photos.forEach(photo => {
    totalLikes += photo.likes;
    photo.likes = 0;
  });

  // Reset user likes tracking
  const userLikesCount = db.userLikes ? db.userLikes.length : 0;
  db.userLikes = [];

  console.log(`Reset ${totalLikes} likes across ${photoCount} photos.`);
  console.log(`Cleared ${userLikesCount} user like records.`);

  // Save the updated database
  const tempPath = path.join(__dirname, 'db.json.tmp');
  
  // Write to a temporary file first to avoid corruption
  fs.writeFileSync(tempPath, JSON.stringify(db, null, 2));
  
  // Rename the temporary file to the actual file (atomic operation)
  fs.renameSync(tempPath, dbPath);

  console.log('Successfully reset all photo likes to 0!');
  console.log('Restart the server for changes to take effect.');

} catch (error) {
  console.error('Error resetting likes:', error);
  process.exit(1);
}