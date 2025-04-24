import { Box, Heading, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="70vh"
      textAlign="center"
      px={4}
    >
      <VStack spacing={8}>
        <MotionHeading
          as={motion.h1}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          fontSize={{ base: '6xl', md: '8xl' }}
          fontWeight="bold"
          color="primary.500"
        >
          404
        </MotionHeading>
        
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Heading as="h2" size="2xl" mb={4}>
            Page Not Found
          </Heading>
          
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="lg" mx="auto" mb={8}>
            Oops! The page you're looking for doesn't exist or has been moved.
          </Text>
          
          <MotionButton
            as={RouterLink}
            to="/"
            colorScheme="primary"
            size="lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </MotionButton>
        </MotionBox>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;