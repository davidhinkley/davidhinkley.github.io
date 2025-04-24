import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Image,
  Badge,
  Button,
  HStack,
  useColorModeValue,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Sample project data - in a real app, this would come from an API or CMS
const projectsData = [
  {
    id: 1,
    title: 'TaskFlow',
    description: 'A beautiful, modern to-do app to organize your tasks with ease. Features include dark mode, drag-and-drop, categories, and more.',
    image: 'https://via.placeholder.com/800x600',
    tags: ['React', 'TypeScript', 'PWA', 'Chakra UI'],
    category: 'Web App',
    demoUrl: '/to-do/',
    githubUrl: 'https://github.com/davidhinkley/taskflow',
    featured: true,
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion for smooth animations and transitions.',
    image: 'https://via.placeholder.com/800x600',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    category: 'Website',
    demoUrl: '/',
    githubUrl: 'https://github.com/davidhinkley/portfolio',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather dashboard that shows current weather and forecasts for any location. Uses OpenWeatherMap API for real-time data.',
    image: 'https://via.placeholder.com/800x600',
    tags: ['JavaScript', 'API Integration', 'CSS'],
    category: 'Web App',
    demoUrl: '#',
    githubUrl: 'https://github.com/davidhinkley/weather-dashboard',
    featured: false,
  },
  {
    id: 4,
    title: 'E-commerce Store',
    description: 'A fully functional e-commerce store with product listings, cart functionality, and checkout process.',
    image: 'https://via.placeholder.com/800x600',
    tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
    category: 'Full Stack',
    demoUrl: '#',
    githubUrl: 'https://github.com/davidhinkley/ecommerce-store',
    featured: false,
  },
  {
    id: 5,
    title: 'Recipe Finder',
    description: 'A recipe finder app that allows users to search for recipes based on ingredients they have on hand.',
    image: 'https://via.placeholder.com/800x600',
    tags: ['React', 'API Integration', 'Styled Components'],
    category: 'Web App',
    demoUrl: '#',
    githubUrl: 'https://github.com/davidhinkley/recipe-finder',
    featured: false,
  },
  {
    id: 6,
    title: 'Movie Database',
    description: 'A movie database app that allows users to search for movies, view details, and save favorites.',
    image: 'https://via.placeholder.com/800x600',
    tags: ['React', 'API Integration', 'CSS Modules'],
    category: 'Web App',
    demoUrl: '#',
    githubUrl: 'https://github.com/davidhinkley/movie-database',
    featured: false,
  },
];

// Get all unique categories and tags
const allCategories = ['All', ...new Set(projectsData.map(project => project.category))];
const allTags = [...new Set(projectsData.flatMap(project => project.tags))];

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Filter projects based on search term, category, and tags
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => project.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });
  
  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  


  return (
    <Box>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={12}
      >
        <Heading as="h1" size="2xl" mb={4}>
          My Projects
        </Heading>
        <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="3xl">
          Browse through my portfolio of projects. Each project represents a unique challenge and showcases different skills and technologies.
        </Text>
      </MotionBox>
      
      {/* Filters */}
      <MotionBox
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        mb={8}
      >
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={4}
          p={6}
          bg={bgColor}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor={borderColor}
        >
          <InputGroup maxW={{ base: 'full', md: '300px' }}>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          
          <Select 
            placeholder="Category" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            maxW={{ base: 'full', md: '200px' }}
          >
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          
          <Box flex="1">
            <Wrap spacing={2} mb={selectedTags.length > 0 ? 2 : 0}>
              {selectedTags.map(tag => (
                <WrapItem key={tag}>
                  <Tag size="md" colorScheme="primary" borderRadius="full">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleTagRemove(tag)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
            
            <Wrap spacing={2}>
              {allTags
                .filter(tag => !selectedTags.includes(tag))
                .map(tag => (
                  <WrapItem key={tag}>
                    <Tag 
                      size="md" 
                      variant="outline" 
                      colorScheme="gray" 
                      borderRadius="full"
                      cursor="pointer"
                      onClick={() => handleTagSelect(tag)}
                      _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                    >
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  </WrapItem>
                ))}
            </Wrap>
          </Box>
        </Flex>
      </MotionBox>
      
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <MotionFlex
          as={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          direction="column"
          gap={8}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SimpleGrid>
        </MotionFlex>
      ) : (
        <Box textAlign="center" py={12}>
          <Heading as="h3" size="lg" mb={4}>
            No projects found
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Try adjusting your search or filter criteria.
          </Text>
          <Button 
            mt={4} 
            colorScheme="primary" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedTags([]);
            }}
          >
            Reset Filters
          </Button>
        </Box>
      )}
    </Box>
  );
};

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    demoUrl: string;
    githubUrl: string;
    featured: boolean;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <MotionBox
      as={motion.div}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      bg={cardBg}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      border="1px"
      borderColor={borderColor}
      position="relative"
    >
      {project.featured && (
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme="primary"
          px={2}
          py={1}
          borderRadius="md"
          zIndex={1}
        >
          Featured
        </Badge>
      )}
      
      <Box h="200px" overflow="hidden">
        <Image
          src={project.image}
          alt={project.title}
          objectFit="cover"
          w="full"
          h="full"
          transition="transform 0.3s"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
      </Box>
      
      <Box p={6}>
        <Heading as="h3" size="lg" mb={2}>
          {project.title}
        </Heading>
        
        <Text color={useColorModeValue('gray.600', 'gray.400')} mb={4}>
          {project.description}
        </Text>
        
        <Wrap spacing={2} mb={4}>
          {project.tags.map(tag => (
            <WrapItem key={tag}>
              <Badge colorScheme="primary" px={2} py={1} borderRadius="md">
                {tag}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
        
        <HStack spacing={4}>
          <Button
            as="a"
            href={project.demoUrl}
            target="_blank"
            leftIcon={<FaExternalLinkAlt />}
            colorScheme="primary"
            size="sm"
          >
            Live Demo
          </Button>
          <Button
            as="a"
            href={project.githubUrl}
            target="_blank"
            leftIcon={<FaGithub />}
            variant="outline"
            size="sm"
          >
            Source Code
          </Button>
        </HStack>
      </Box>
    </MotionBox>
  );
};

export default ProjectsPage;