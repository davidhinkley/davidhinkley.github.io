#!/bin/bash

# Create uploads directory if it doesn't exist
mkdir -p uploads

# Check if sample images already exist
if [ -f "uploads/sunset.jpg" ] && [ -f "uploads/mountains.jpg" ] && [ -f "uploads/city.jpg" ]; then
  echo "Sample images already exist in uploads directory."
  exit 0
fi

# Create placeholder images if they don't exist
# Sunset image (orange gradient)
convert -size 800x600 gradient:orange-yellow uploads/sunset.jpg

# Mountains image (blue-white gradient)
convert -size 800x600 gradient:blue-white uploads/mountains.jpg

# City image (dark blue gradient)
convert -size 800x600 gradient:navy-black uploads/city.jpg

echo "Sample images created in uploads directory."
echo "Note: These are placeholder gradient images. Replace them with real photos for better appearance."