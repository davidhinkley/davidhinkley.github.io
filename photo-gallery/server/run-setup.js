// This script runs the necessary setup steps for the server
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Setting up the server...');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// Run the download-images.js script
console.log('\nDownloading sample images...');
try {
  execSync('node download-images.js', { 
    cwd: __dirname,
    stdio: 'inherit'
  });
} catch (error) {
  console.error('Error downloading sample images:', error);
}

console.log('\nSetup complete! You can now start the server.');