import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/NavbarNew';
import AnimatedRoutes from './components/routing/AnimatedRoutes';
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

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
            <AnimatedRoutes />
          </main>
          <footer className="bg-gray-800 dark:bg-gray-950 text-white py-6 mt-auto">
            <div className="container mx-auto px-4">
              <p className="text-center">© {new Date().getFullYear()} David Stuart Hinkley. All rights reserved.</p>
            </div>
          </footer>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;