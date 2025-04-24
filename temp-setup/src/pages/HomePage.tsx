import { Box, Heading, Text, Button, Stack, Flex, Image, useColorModeValue, SimpleGrid, Icon, VStack, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaCode, FaLaptopCode, FaMobileAlt, FaServer } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const HomePage = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, primary.50, gray.50)',
    'linear(to-br, gray.900, gray.800)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box>
      {/* Hero Section */}
      <MotionBox
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        bgGradient={bgGradient}
        py={{ base: 16, md: 24 }}
        px={4}
        borderRadius="lg"
        mb={16}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          maxW="container.lg"
          mx="auto"
          gap={8}
        >
          <MotionBox
            as={motion.div}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            maxW={{ base: 'full', md: '50%' }}
          >
            <MotionHeading
              as={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              mb={4}
            >
              Hi, I'm <Text as="span" color="primary.500">David Hinkley</Text>
            </MotionHeading>
            <MotionText
              as={motion.p}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              fontSize={{ base: 'lg', md: 'xl' }}
              color={useColorModeValue('gray.600', 'gray.300')}
              mb={6}
            >
              A passionate frontend developer creating modern, responsive, and user-friendly web applications with clean code and attention to detail.
            </MotionText>
            <MotionBox
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                <Button
                  as={RouterLink}
                  to="/projects"
                  size="lg"
                  colorScheme="primary"
                  fontWeight="bold"
                  px={8}
                >
                  View Projects
                </Button>
                <Button
                  as={RouterLink}
                  to="/contact"
                  size="lg"
                  variant="outline"
                  colorScheme="primary"
                  fontWeight="bold"
                  px={8}
                >
                  Contact Me
                </Button>
              </Stack>
            </MotionBox>
          </MotionBox>
          
          <MotionBox
            as={motion.div}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            maxW={{ base: 'full', md: '40%' }}
          >
            <Image
              src="https://via.placeholder.com/500x500"
              alt="David Hinkley"
              borderRadius="full"
              boxShadow="xl"
              objectFit="cover"
              border="4px solid"
              borderColor="primary.500"
            />
          </MotionBox>
        </Flex>
      </MotionBox>

      {/* Featured Projects Section */}
      <Box as="section" py={16}>
        <Box textAlign="center" mb={12}>
          <Heading as="h2" size="xl" mb={4}>
            Featured Projects
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl" mx="auto">
            Check out some of my recent work. These projects showcase my skills and expertise in web development.
          </Text>
        </Box>

        <MotionFlex
          as={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          direction="column"
          gap={8}
        >
          {/* Project 1 - TaskFlow */}
          <MotionBox
            as={motion.div}
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              bg={cardBg}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              border="1px"
              borderColor={cardBorder}
              _hover={{ boxShadow: 'lg' }}
            >
              <Box w={{ base: 'full', md: '50%' }} h={{ base: '200px', md: 'auto' }}>
                <Image
                  src="https://via.placeholder.com/800x600"
                  alt="TaskFlow App"
                  objectFit="cover"
                  w="full"
                  h="full"
                />
              </Box>
              <Box p={6} w={{ base: 'full', md: '50%' }}>
                <Flex justify="space-between" align="center" mb={2}>
                  <Heading as="h3" size="lg">TaskFlow</Heading>
                  <HStack>
                    <Badge colorScheme="primary" px={2} py={1} borderRadius="md">React</Badge>
                    <Badge colorScheme="purple" px={2} py={1} borderRadius="md">PWA</Badge>
                  </HStack>
                </Flex>
                <Text color={useColorModeValue('gray.600', 'gray.400')} mb={4}>
                  A beautiful, modern to-do app to organize your tasks with ease. Features include dark mode, drag-and-drop, categories, and more.
                </Text>
                <HStack spacing={4}>
                  <Button
                    as="a"
                    href="/to-do/"
                    target="_blank"
                    leftIcon={<FaExternalLinkAlt />}
                    colorScheme="primary"
                    size="sm"
                  >
                    Live Demo
                  </Button>
                  <Button
                    as="a"
                    href="https://github.com/davidhinkley/taskflow"
                    target="_blank"
                    leftIcon={<FaGithub />}
                    variant="outline"
                    size="sm"
                  >
                    Source Code
                  </Button>
                </HStack>
              </Box>
            </Flex>
          </MotionBox>

          {/* Project 2 */}
          <MotionBox
            as={motion.div}
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Flex
              direction={{ base: 'column', md: 'row-reverse' }}
              bg={cardBg}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              border="1px"
              borderColor={cardBorder}
              _hover={{ boxShadow: 'lg' }}
            >
              <Box w={{ base: 'full', md: '50%' }} h={{ base: '200px', md: 'auto' }}>
                <Image
                  src="https://via.placeholder.com/800x600"
                  alt="Portfolio Website"
                  objectFit="cover"
                  w="full"
                  h="full"
                />
              </Box>
              <Box p={6} w={{ base: 'full', md: '50%' }}>
                <Flex justify="space-between" align="center" mb={2}>
                  <Heading as="h3" size="lg">Portfolio Website</Heading>
                  <HStack>
                    <Badge colorScheme="blue" px={2} py={1} borderRadius="md">React</Badge>
                    <Badge colorScheme="green" px={2} py={1} borderRadius="md">Tailwind</Badge>
                  </HStack>
                </Flex>
                <Text color={useColorModeValue('gray.600', 'gray.400')} mb={4}>
                  A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion for smooth animations and transitions.
                </Text>
                <HStack spacing={4}>
                  <Button
                    as="a"
                    href="/"
                    leftIcon={<FaExternalLinkAlt />}
                    colorScheme="primary"
                    size="sm"
                  >
                    Live Demo
                  </Button>
                  <Button
                    as="a"
                    href="https://github.com/davidhinkley/portfolio"
                    target="_blank"
                    leftIcon={<FaGithub />}
                    variant="outline"
                    size="sm"
                  >
                    Source Code
                  </Button>
                </HStack>
              </Box>
            </Flex>
          </MotionBox>
        </MotionFlex>

        <Box textAlign="center" mt={12}>
          <Button
            as={RouterLink}
            to="/projects"
            size="lg"
            variant="outline"
            colorScheme="primary"
            rightIcon={<FaExternalLinkAlt />}
          >
            View All Projects
          </Button>
        </Box>
      </Box>

      {/* Skills Section */}
      <Box as="section" py={16} bg={useColorModeValue('gray.50', 'gray.800')} borderRadius="lg">
        <Box textAlign="center" mb={12}>
          <Heading as="h2" size="xl" mb={4}>
            My Skills
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl" mx="auto">
            I specialize in frontend development with a focus on creating responsive, accessible, and performant web applications.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="container.lg" mx="auto" px={4}>
          <SkillCard
            icon={FaCode}
            title="Frontend Development"
            description="Building responsive and interactive user interfaces with modern frameworks and libraries."
            skills={['React', 'TypeScript', 'HTML/CSS', 'Tailwind CSS']}
          />
          <SkillCard
            icon={FaLaptopCode}
            title="UI/UX Design"
            description="Creating intuitive and visually appealing user experiences with attention to detail."
            skills={['Figma', 'Responsive Design', 'Accessibility', 'Animation']}
          />
          <SkillCard
            icon={FaServer}
            title="Backend Integration"
            description="Connecting frontend applications to backend services and APIs for full-stack functionality."
            skills={['RESTful APIs', 'GraphQL', 'Firebase', 'Authentication']}
          />
        </SimpleGrid>
      </Box>

      {/* CTA Section */}
      <Box as="section" py={16} textAlign="center">
        <MotionBox
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          maxW="container.md"
          mx="auto"
          p={8}
          bg={useColorModeValue('primary.50', 'gray.700')}
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading as="h2" size="xl" mb={4}>
            Let's Work Together
          </Heading>
          <Text fontSize="lg" mb={6} maxW="2xl" mx="auto">
            I'm currently available for freelance work and open to new opportunities. If you have a project in mind or just want to chat, feel free to reach out!
          </Text>
          <Button
            as={RouterLink}
            to="/contact"
            size="lg"
            colorScheme="primary"
            px={8}
            fontWeight="bold"
          >
            Get in Touch
          </Button>
        </MotionBox>
      </Box>
    </Box>
  );
};

interface SkillCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  skills: string[];
}

const SkillCard = ({ icon, title, description, skills }: SkillCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <MotionBox
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      bg={cardBg}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      transition="all 0.3s"
    >
      <VStack spacing={4} align="flex-start">
        <Icon as={icon} boxSize={10} color="primary.500" />
        <Heading as="h3" size="md">{title}</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {description}
        </Text>
        <HStack spacing={2} flexWrap="wrap" mt={2}>
          {skills.map((skill) => (
            <Badge key={skill} colorScheme="primary" px={2} py={1} borderRadius="md" my={1}>
              {skill}
            </Badge>
          ))}
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default HomePage;