# Photo Gallery

An advanced photo gallery application built with React, Node.js, and Tailwind CSS.

## Features

- Responsive image gallery with grid layout
- Image upload functionality
- Image filtering and search
- Lightbox view for images
- User authentication
- Image categorization
- Like functionality for photos

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Storage**: In-memory storage (can be extended to MongoDB)
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
photo-gallery/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── context/        # React context providers
│       ├── pages/          # Page components
│       └── ...
└── server/                 # Node.js backend
    ├── middleware/         # Express middleware
    ├── routes/             # API routes
    ├── uploads/            # Uploaded images
    └── server.js           # Main server file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install backend dependencies
cd photo-gallery/server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Start the development servers:

```bash
# Start backend server
cd photo-gallery/server
npm run dev

# Start frontend server (in a new terminal)
cd photo-gallery/client
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user

### Photos

- `GET /api/photos` - Get all photos
- `GET /api/photos/:id` - Get a specific photo
- `POST /api/photos` - Upload a new photo (requires authentication)
- `PUT /api/photos/:id` - Update a photo (requires authentication)
- `DELETE /api/photos/:id` - Delete a photo (requires authentication)
- `POST /api/photos/:id/like` - Like a photo (requires authentication)

## Future Enhancements

- Add comments functionality
- Implement social sharing
- Add user profile customization
- Integrate with cloud storage
- Add pagination for large galleries
- Implement photo albums