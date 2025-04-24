import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Link,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Links = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgColor = useColorModeValue(
    scrolled ? 'white' : 'rgba(255, 255, 255, 0.8)',
    scrolled ? 'gray.900' : 'rgba(26, 32, 44, 0.8)'
  );
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={bgColor}
      px={4}
      borderBottom={scrolled ? '1px' : '0px'}
      borderColor={borderColor}
      backdropFilter="blur(10px)"
      transition="all 0.3s"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} className="container-custom">
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box fontWeight="bold" fontSize="xl">
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              David Hinkley
            </Link>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path} isActive={location.pathname === link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Button onClick={toggleColorMode} variant="ghost" mr={3}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button
            as={RouterLink}
            to="/contact"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'primary.500'}
            _hover={{
              bg: 'primary.600',
            }}
          >
            Get in Touch
          </Button>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.path} 
                  isActive={location.pathname === link.path}
                  onClick={onClose}
                >
                  {link.name}
                </NavLink>
              ))}
              <Button
                as={RouterLink}
                to="/contact"
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'primary.500'}
                _hover={{
                  bg: 'primary.600',
                }}
                onClick={onClose}
              >
                Get in Touch
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink = ({ children, to, isActive, onClick }: NavLinkProps) => {
  const activeColor = useColorModeValue('primary.600', 'primary.300');
  const hoverColor = useColorModeValue('gray.700', 'gray.200');
  const color = isActive ? activeColor : undefined;
  
  return (
    <Link
      as={RouterLink}
      px={2}
      py={1}
      rounded={'md'}
      color={color}
      fontWeight={isActive ? 'semibold' : 'medium'}
      _hover={{
        textDecoration: 'none',
        color: hoverColor,
      }}
      to={to}
      position="relative"
      onClick={onClick}
    >
      {children}
      {isActive && (
        <Box
          position="absolute"
          bottom="-1px"
          left="0"
          right="0"
          height="2px"
          bg={activeColor}
          borderRadius="full"
          as={motion.div}
          layoutId="activeNavIndicator"
        />
      )}
    </Link>
  );
};

export default Header;