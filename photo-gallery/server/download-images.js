const fs = require('fs');
const path = require('path');
const https = require('https');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// Sample image URLs (using placeholder images from placehold.co)
const sampleImages = [
  {
    name: 'sunset.jpg',
    url: 'https://placehold.co/800x600/orange/white?text=Sunset'
  },
  {
    name: 'mountains.jpg',
    url: 'https://placehold.co/800x600/blue/white?text=Mountains'
  },
  {
    name: 'city.jpg',
    url: 'https://placehold.co/800x600/333/white?text=City+Skyline'
  }
];

// Download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(uploadsDir, filename);
    console.log(`Downloading ${filename} to ${filePath}...`);
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filePath, () => {});
        console.error(`Error writing to file ${filename}:`, err);
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.error(`Error downloading ${filename}:`, err);
      reject(err);
    });
  });
}

// Download all sample images
async function downloadAllImages() {
  try {
    console.log('Starting download of sample images...');
    for (const image of sampleImages) {
      await downloadImage(image.url, image.name);
    }
    console.log('All sample images have been downloaded successfully.');
  } catch (error) {
    console.error('Error downloading sample images:', error);
  }
}

// Run the download if this file is executed directly
if (require.main === module) {
  downloadAllImages();
}

// Export the function so it can be called from other files
module.exports = downloadAllImages;