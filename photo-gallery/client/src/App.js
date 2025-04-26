import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/NavbarNew';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import PhotoDetail from './pages/PhotoDetail';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import BackupManagerNew from './pages/BackupManagerNew';
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-200">
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-grow bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/photos/:id" element={<PhotoDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/upload" 
                element={
                  <PrivateRoute>
                    <Upload />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/backups" 
                element={
                  <PrivateRoute>
                    <BackupManagerNew />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <footer className="bg-gray-800 dark:bg-gray-950 text-white py-6 mt-auto">
            <div className="container mx-auto px-4">
              <p className="text-center">© {new Date().getFullYear()} <span className="galleria-title">Galleria</span>. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;