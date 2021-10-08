import { Image } from '@chakra-ui/image';
import { FaTwitter } from 'react-icons/fa';
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  List,
  Text,
} from '@chakra-ui/layout';
import signupHero from '../../assets/signupHero.png';
import { Button } from '@chakra-ui/button';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

function Signup() {
  return (
    <Box bg='brand.bg' h='100vh' color='brand.text'>
      <Flex h={{ lg: '94vh' }} flexDir={{ lg: 'row', base: 'column-reverse' }}>
        <Image src={signupHero} h='full' w={{ lg: '54%' }} />

        <Box pl={{ sm: '10', base: '5' }} bg='brand.bg' py='20'>
          <Box pb={{ lg: '16', base: '8' }}>
            <FaTwitter size={50} color='#35B9F9' />
          </Box>
          <Heading fontSize={60} pb={{ lg: '16', base: '3' }}>
            Happening now
          </Heading>
          <Heading>Join Twitter today.</Heading>

          <SignupModal />

          <Text fontWeight={300} maxW='96' pb='14'>
            By <Link color='brand.main'> signing up</Link>, you agree to the{' '}
            <Link color='brand.main'>Terms of Service</Link> and{' '}
            <Link color='brand.main'> Privacy Policy</Link>, including Cookie
            Use.
          </Text>
          <Text>
            Already have an account?{' '}
            <Link color='brand.main'>
              {' '}
              <LoginModal />{' '}
            </Link>
          </Text>
        </Box>
      </Flex>

      <Flex
        bg='brand.bg'
        as={List}
        pt='4'
        pb={{ base: '4', lg: '0' }}
        display={{ lg: 'block', base: 'block' }}
        px={{ lg: '20' }}
        textAlign={'center'}
        fontWeight={200}
        fontSize='xs'>
        {[
          'About',
          'Help Center',
          'Terms of Service',
          'Privacy Policy',
          'Cookie Policy',
          'Ads info',
          'Blog',
          'Status',
          'Careers',
          'Brand Resources',
          'Advertising',
          'Marketing',
          'Twitter for Business',
          'Developers',
          'Directory',
          'Settings',
          '© 2021 Twitter, Inc.',
        ].map((item, i) => (
          <Link px='2' m='auto'>
            {item}
          </Link>
        ))}
      </Flex> 
    </Box>
  );
}

export default Signup;
