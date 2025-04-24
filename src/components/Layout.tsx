import { Outlet } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const MotionBox = motion(Box);

const Layout = () => {
  const bgColor = useColorModeValue('white', 'gray.900');
  
  return (
    <Box minH="100vh" bg={bgColor}>
      <Header />
      <MotionBox
        as="main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container-custom py-8 md:py-12"
      >
        <Outlet />
      </MotionBox>
      <Footer />
    </Box>
  );
};

export default Layout;