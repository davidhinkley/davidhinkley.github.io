import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../ui/PageTransition';
import PrivateRoute from './PrivateRoute';

// Import lazy-loaded components
const Home = React.lazy(() => import('../../pages/Home'));
const Gallery = React.lazy(() => import('../../pages/Gallery'));
const PhotoDetail = React.lazy(() => import('../../pages/PhotoDetail'));
const Upload = React.lazy(() => import('../../pages/Upload'));
const Login = React.lazy(() => import('../../pages/Login'));
const Register = React.lazy(() => import('../../pages/Register'));
const Profile = React.lazy(() => import('../../pages/Profile'));
const BackupManagerNew = React.lazy(() => import('../../pages/BackupManagerNew'));
const UserManagement = React.lazy(() => import('../../pages/UserManagement'));

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
      </div>
    }>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/gallery" element={
            <PageTransition>
              <Gallery />
            </PageTransition>
          } />
          <Route path="/photos/:id" element={
            <PageTransition>
              <PhotoDetail />
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } />
          <Route path="/register" element={
            <PageTransition>
              <Register />
            </PageTransition>
          } />
          <Route path="/upload" element={
            <PrivateRoute>
              <PageTransition>
                <Upload />
              </PageTransition>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <PageTransition>
                <Profile />
              </PageTransition>
            </PrivateRoute>
          } />
          <Route path="/backups" element={
            <PrivateRoute>
              <PageTransition>
                <BackupManagerNew />
              </PageTransition>
            </PrivateRoute>
          } />
          <Route path="/users" element={
            <PrivateRoute>
              <PageTransition>
                <UserManagement />
              </PageTransition>
            </PrivateRoute>
          } />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default AnimatedRoutes;