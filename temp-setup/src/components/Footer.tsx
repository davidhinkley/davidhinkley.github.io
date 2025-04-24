import { Box, Container, Stack, Text, Link, useColorModeValue, Icon, Flex } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="footer"
      bg={bgColor}
      borderTop="1px"
      borderColor={borderColor}
      py={10}
    >
      <Container maxW="container.lg">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={8}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Stack direction="column" spacing={2} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight="bold" fontSize="xl">David Hinkley</Text>
            <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
              Frontend Developer & UI/UX Enthusiast
            </Text>
          </Stack>
          
          <Stack direction="row" spacing={6}>
            <SocialButton label="GitHub" href="https://github.com/davidhinkley" icon={FaGithub} />
            <SocialButton label="LinkedIn" href="#" icon={FaLinkedin} />
            <SocialButton label="Twitter" href="#" icon={FaTwitter} />
            <SocialButton label="Email" href="mailto:contact@example.com" icon={FaEnvelope} />
          </Stack>
        </Stack>
        
        <Box mt={8}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'center' }}
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            <Text>© {currentYear} David Hinkley. All rights reserved.</Text>
            <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
              <Link href="/about">About</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Contact</Link>
            </Stack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

interface SocialButtonProps {
  label: string;
  href: string;
  icon: React.ElementType;
}

const SocialButton = ({ label, href, icon }: SocialButtonProps) => {
  return (
    <Link
      href={href}
      isExternal
      aria-label={label}
      _hover={{ transform: 'translateY(-2px)' }}
      transition="all 0.3s"
    >
      <Icon
        as={icon}
        boxSize={6}
        color={useColorModeValue('gray.600', 'gray.400')}
        _hover={{ color: useColorModeValue('primary.500', 'primary.300') }}
        transition="all 0.3s"
      />
    </Link>
  );
};

export default Footer;