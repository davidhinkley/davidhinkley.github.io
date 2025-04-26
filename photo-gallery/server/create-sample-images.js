const fs = require('fs');
const path = require('path');
const https = require('https');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
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
    
    // Check if file exists but has zero size (which would indicate a failed download)
    const forceDownload = process.argv.includes('--force');
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 0 && !forceDownload) {
        console.log(`${filename} already exists, skipping download.`);
        return resolve();
      } else if (stats.size === 0 || forceDownload) {
        console.log(`${filename} exists but may be corrupted or force flag is set, re-downloading...`);
      }
    } else {
      console.log(`Downloading ${filename}...`);
    }
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
}

// Download all sample images
async function downloadAllImages() {
  try {
    for (const image of sampleImages) {
      await downloadImage(image.url, image.name);
    }
    console.log('All sample images have been downloaded successfully.');
  } catch (error) {
    console.error('Error downloading sample images:', error);
  }
}

// Run the download
downloadAllImages();