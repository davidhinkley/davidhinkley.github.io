import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  FormErrorMessage,
  useToast,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const MotionBox = motion(Box);

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const toast = useToast();
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: 'Message sent!',
          description: "I'll get back to you as soon as possible.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }, 1500);
    }
  };
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
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
          Get in Touch
        </Heading>
        <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="3xl">
          Have a question, project idea, or just want to say hello? Feel free to reach out using the form below or through any of my social channels.
        </Text>
      </MotionBox>
      
      {/* Contact Grid */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={16}>
        {/* Contact Form */}
        <MotionBox
          as={motion.div}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          p={8}
          bg={cardBg}
          borderRadius="lg"
          boxShadow="md"
          border="1px"
          borderColor={borderColor}
        >
          <Heading as="h2" size="lg" mb={6}>
            Send a Message
          </Heading>
          
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={!!errors.subject}>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What's this about?"
                />
                <FormErrorMessage>{errors.subject}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={!!errors.message}>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  minH="150px"
                />
                <FormErrorMessage>{errors.message}</FormErrorMessage>
              </FormControl>
              
              <Button
                type="submit"
                colorScheme="primary"
                size="lg"
                width="full"
                mt={4}
                isLoading={isSubmitting}
                loadingText="Sending..."
              >
                Send Message
              </Button>
            </VStack>
          </form>
        </MotionBox>
        
        {/* Contact Info */}
        <MotionBox
          as={motion.div}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VStack spacing={8} align="stretch">
            {/* Contact Details */}
            <Box
              p={8}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              border="1px"
              borderColor={borderColor}
            >
              <Heading as="h2" size="lg" mb={6}>
                Contact Information
              </Heading>
              
              <VStack spacing={6} align="stretch">
                <ContactInfo
                  icon={FaEnvelope}
                  title="Email"
                  content="contact@example.com"
                  href="mailto:contact@example.com"
                />
                
                <ContactInfo
                  icon={FaPhone}
                  title="Phone"
                  content="+1 (555) 123-4567"
                  href="tel:+15551234567"
                />
                
                <ContactInfo
                  icon={FaMapMarkerAlt}
                  title="Location"
                  content="San Francisco, CA, USA"
                  href="#"
                />
              </VStack>
            </Box>
            
            {/* Social Links */}
            <Box
              p={8}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              border="1px"
              borderColor={borderColor}
            >
              <Heading as="h2" size="lg" mb={6}>
                Connect With Me
              </Heading>
              
              <VStack spacing={6} align="stretch">
                <SocialLink
                  icon={FaGithub}
                  platform="GitHub"
                  username="davidhinkley"
                  href="https://github.com/davidhinkley"
                />
                
                <SocialLink
                  icon={FaLinkedin}
                  platform="LinkedIn"
                  username="davidhinkley"
                  href="https://linkedin.com/in/davidhinkley"
                />
                
                <SocialLink
                  icon={FaTwitter}
                  platform="Twitter"
                  username="@davidhinkley"
                  href="https://twitter.com/davidhinkley"
                />
              </VStack>
            </Box>
          </VStack>
        </MotionBox>
      </SimpleGrid>
      
      {/* FAQ Section */}
      <MotionBox
        as={motion.section}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        p={8}
        bg={cardBg}
        borderRadius="lg"
        boxShadow="md"
        border="1px"
        borderColor={borderColor}
        mb={16}
      >
        <Heading as="h2" size="lg" mb={6}>
          Frequently Asked Questions
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <FaqItem
            question="What services do you offer?"
            answer="I specialize in frontend development, creating responsive websites and web applications using modern technologies like React, TypeScript, and various CSS frameworks."
          />
          
          <FaqItem
            question="How quickly can you complete a project?"
            answer="Project timelines vary depending on complexity and scope. A simple website might take 2-3 weeks, while more complex applications could take several months. I'll provide a detailed timeline during our initial consultation."
          />
          
          <FaqItem
            question="Do you work remotely?"
            answer="Yes, I work remotely with clients from all over the world. I use tools like Slack, Zoom, and project management software to ensure smooth communication and collaboration."
          />
          
          <FaqItem
            question="What is your typical process for new projects?"
            answer="My process typically includes an initial consultation, requirements gathering, design mockups, development, testing, and deployment. I maintain open communication throughout to ensure your vision is realized."
          />
        </SimpleGrid>
      </MotionBox>
      
      {/* CTA Section */}
      <MotionBox
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        textAlign="center"
        p={12}
        bg={useColorModeValue('primary.50', 'gray.700')}
        borderRadius="lg"
      >
        <Heading as="h2" size="xl" mb={4}>
          Ready to Start Your Project?
        </Heading>
        <Text fontSize="lg" maxW="2xl" mx="auto" mb={8}>
          I'm currently available for freelance work and new opportunities. Let's create something amazing together!
        </Text>
        <Button
          size="lg"
          colorScheme="primary"
          px={8}
          py={6}
          fontSize="md"
          height="auto"
          onClick={() => {
            const formElement = document.getElementById('name');
            if (formElement) {
              formElement.scrollIntoView({ behavior: 'smooth' });
              formElement.focus();
            }
          }}
        >
          Get Started Now
        </Button>
      </MotionBox>
    </Box>
  );
};

interface ContactInfoProps {
  icon: React.ElementType;
  title: string;
  content: string;
  href: string;
}

const ContactInfo = ({ icon, title, content, href }: ContactInfoProps) => {
  return (
    <HStack spacing={4}>
      <Flex
        w="40px"
        h="40px"
        bg="primary.500"
        color="white"
        borderRadius="full"
        justify="center"
        align="center"
        flexShrink={0}
      >
        <Icon as={icon} boxSize={5} />
      </Flex>
      <Box>
        <Text fontWeight="bold">{title}</Text>
        <Text
          as="a"
          href={href}
          color={useColorModeValue('primary.600', 'primary.300')}
          _hover={{ textDecoration: 'underline' }}
        >
          {content}
        </Text>
      </Box>
    </HStack>
  );
};

interface SocialLinkProps {
  icon: React.ElementType;
  platform: string;
  username: string;
  href: string;
}

const SocialLink = ({ icon, platform, username, href }: SocialLinkProps) => {
  return (
    <HStack
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      spacing={4}
      p={3}
      borderRadius="md"
      _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
      transition="all 0.3s"
    >
      <Flex
        w="40px"
        h="40px"
        bg={useColorModeValue('gray.100', 'gray.700')}
        color={useColorModeValue('gray.800', 'white')}
        borderRadius="full"
        justify="center"
        align="center"
        flexShrink={0}
      >
        <Icon as={icon} boxSize={5} />
      </Flex>
      <Box>
        <Text fontWeight="bold">{platform}</Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {username}
        </Text>
      </Box>
    </HStack>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  return (
    <Box>
      <Heading as="h3" size="md" mb={2}>
        {question}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {answer}
      </Text>
    </Box>
  );
};

export default ContactPage;