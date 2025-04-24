import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaGraduationCap, FaBriefcase, FaDownload, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const AboutPage = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, primary.50, gray.50)',
    'linear(to-br, gray.900, gray.800)'
  );
  
  return (
    <Box>
      {/* Hero Section */}
      <MotionBox
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        bgGradient={bgGradient}
        py={{ base: 12, md: 16 }}
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
              About Me
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
              I'm a passionate frontend developer with a keen eye for design and a commitment to creating exceptional user experiences.
            </MotionText>
            <MotionBox
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <HStack spacing={4}>
                <Button
                  as="a"
                  href="/resume.pdf"
                  download
                  leftIcon={<FaDownload />}
                  colorScheme="primary"
                >
                  Download Resume
                </Button>
                <Button
                  as={RouterLink}
                  to="/contact"
                  variant="outline"
                  colorScheme="primary"
                >
                  Contact Me
                </Button>
              </HStack>
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

      {/* Bio Section */}
      <MotionBox
        as={motion.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        mb={16}
      >
        <Heading as="h2" size="xl" mb={6}>
          My Story
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <Text fontSize="lg" mb={4}>
              I'm a frontend developer with a passion for creating beautiful, functional, and user-friendly websites and applications. With a background in both design and development, I bring a unique perspective to every project I work on.
            </Text>
            <Text fontSize="lg" mb={4}>
              My journey in web development began over 5 years ago when I built my first website. Since then, I've been constantly learning and improving my skills, staying up-to-date with the latest technologies and best practices in the industry.
            </Text>
            <Text fontSize="lg">
              I specialize in React and modern JavaScript, but I'm always excited to learn new technologies and frameworks. I believe in writing clean, maintainable code and creating intuitive user experiences that delight users.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h3" size="md" mb={4}>
              Core Values
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="primary.500" />
                User-centered design and development
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="primary.500" />
                Clean, maintainable, and well-documented code
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="primary.500" />
                Continuous learning and improvement
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="primary.500" />
                Attention to detail and pixel-perfect implementation
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="primary.500" />
                Collaborative approach to problem-solving
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="primary.500" />
                Performance optimization and accessibility
              </ListItem>
            </List>
          </Box>
        </SimpleGrid>
      </MotionBox>

      {/* Experience & Education */}
      <MotionBox
        as={motion.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        mb={16}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* Experience */}
          <Box>
            <Flex align="center" mb={6}>
              <Icon as={FaBriefcase} boxSize={6} color="primary.500" mr={2} />
              <Heading as="h2" size="xl">
                Experience
              </Heading>
            </Flex>
            
            <VStack spacing={6} align="stretch">
              <TimelineItem
                title="Senior Frontend Developer"
                company="Tech Innovations Inc."
                period="2021 - Present"
                description="Lead frontend development for multiple projects, mentored junior developers, and implemented best practices for code quality and performance."
              />
              
              <TimelineItem
                title="Frontend Developer"
                company="Digital Solutions LLC"
                period="2018 - 2021"
                description="Developed responsive web applications using React, implemented UI/UX designs, and collaborated with backend developers to integrate APIs."
              />
              
              <TimelineItem
                title="Web Developer Intern"
                company="StartUp Hub"
                period="2017 - 2018"
                description="Assisted in developing and maintaining websites, learned modern web development practices, and contributed to team projects."
              />
            </VStack>
          </Box>
          
          {/* Education */}
          <Box>
            <Flex align="center" mb={6}>
              <Icon as={FaGraduationCap} boxSize={6} color="primary.500" mr={2} />
              <Heading as="h2" size="xl">
                Education
              </Heading>
            </Flex>
            
            <VStack spacing={6} align="stretch">
              <TimelineItem
                title="Master's in Computer Science"
                company="Tech University"
                period="2015 - 2017"
                description="Specialized in Human-Computer Interaction and Web Technologies. Graduated with honors."
              />
              
              <TimelineItem
                title="Bachelor's in Software Engineering"
                company="State University"
                period="2011 - 2015"
                description="Focused on software development fundamentals, data structures, and algorithms. Participated in coding competitions."
              />
              
              <TimelineItem
                title="Online Courses & Certifications"
                company="Various Platforms"
                period="2018 - Present"
                description="Continuously expanding knowledge through courses on platforms like Udemy, Coursera, and Frontend Masters."
              />
            </VStack>
          </Box>
        </SimpleGrid>
      </MotionBox>

      {/* Skills Section */}
      <MotionBox
        as={motion.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        mb={16}
      >
        <Heading as="h2" size="xl" mb={6}>
          Skills & Technologies
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <SkillCategory
            title="Frontend Development"
            skills={[
              'React & React Hooks',
              'TypeScript / JavaScript',
              'HTML5 & CSS3',
              'Tailwind CSS',
              'Chakra UI / Material UI',
              'Redux / Context API',
              'Responsive Design',
              'Framer Motion',
            ]}
          />
          
          <SkillCategory
            title="Tools & Practices"
            skills={[
              'Git & GitHub',
              'Webpack / Vite',
              'Jest & Testing Library',
              'Figma / Adobe XD',
              'Agile / Scrum',
              'CI/CD Pipelines',
              'Performance Optimization',
              'Accessibility (a11y)',
            ]}
          />
          
          <SkillCategory
            title="Other Skills"
            skills={[
              'Node.js / Express',
              'RESTful APIs',
              'GraphQL',
              'Firebase',
              'MongoDB / SQL Basics',
              'AWS / Netlify / Vercel',
              'Technical Writing',
              'Problem Solving',
            ]}
          />
        </SimpleGrid>
      </MotionBox>

      {/* Connect Section */}
      <MotionBox
        as={motion.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        textAlign="center"
        py={12}
        px={6}
        bg={useColorModeValue('gray.50', 'gray.800')}
        borderRadius="lg"
      >
        <Heading as="h2" size="xl" mb={4}>
          Let's Connect
        </Heading>
        <Text fontSize="lg" maxW="2xl" mx="auto" mb={8}>
          I'm always open to new opportunities, collaborations, or just a friendly chat about web development and technology.
        </Text>
        <HStack spacing={6} justify="center">
          <SocialButton
            label="LinkedIn"
            href="https://linkedin.com/in/davidhinkley"
            icon={FaLinkedin}
            colorScheme="linkedin"
          />
          <SocialButton
            label="GitHub"
            href="https://github.com/davidhinkley"
            icon={FaGithub}
            colorScheme="gray"
          />
          <SocialButton
            label="Twitter"
            href="https://twitter.com/davidhinkley"
            icon={FaTwitter}
            colorScheme="twitter"
          />
        </HStack>
      </MotionBox>
    </Box>
  );
};

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

const TimelineItem = ({ title, company, period, description }: TimelineItemProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box
      p={5}
      bg={cardBg}
      borderRadius="md"
      boxShadow="sm"
      border="1px"
      borderColor={borderColor}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: '0',
        left: '-9px',
        width: '18px',
        height: '18px',
        borderRadius: 'full',
        bg: 'primary.500',
        border: '3px solid',
        borderColor: useColorModeValue('white', 'gray.800'),
        zIndex: 1,
      }}
    >
      <Heading as="h3" size="md" mb={1}>
        {title}
      </Heading>
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontWeight="medium" color="primary.500">
          {company}
        </Text>
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
          {period}
        </Text>
      </Flex>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {description}
      </Text>
    </Box>
  );
};

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

const SkillCategory = ({ title, skills }: SkillCategoryProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box
      p={5}
      bg={cardBg}
      borderRadius="md"
      boxShadow="sm"
      border="1px"
      borderColor={borderColor}
    >
      <Heading as="h3" size="md" mb={4} color="primary.500">
        {title}
      </Heading>
      <List spacing={2}>
        {skills.map((skill, index) => (
          <ListItem key={index}>
            <ListIcon as={FaCheckCircle} color="primary.500" />
            {skill}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

interface SocialButtonProps {
  label: string;
  href: string;
  icon: React.ElementType;
  colorScheme: string;
}

const SocialButton = ({ label, href, icon, colorScheme }: SocialButtonProps) => {
  return (
    <Button
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      leftIcon={<Icon as={icon} />}
      colorScheme={colorScheme}
      size="lg"
      borderRadius="full"
      px={6}
    >
      {label}
    </Button>
  );
};

export default AboutPage;