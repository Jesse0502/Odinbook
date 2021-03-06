import { Box, Flex, Link, Text } from '@chakra-ui/layout';
import { FaTwitter, FaUserAlt, FaSearch } from 'react-icons/fa';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';

import { AiFillHome } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { Avatar } from '@chakra-ui/avatar';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import NavOpenTweet from './NavOpenTweet';
import useAuth from '../customHooks/useAuth';
import useUserInfo from '../customHooks/useUserInfo';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { MdEmail, MdOutlineEmail } from 'react-icons/md';
import { AiFillBell, AiOutlineBell } from 'react-icons/ai';
import {BsSearch} from 'react-icons/bs';
function Navbar({ home, profile, messages, notifications }) {
  const [loggedAuthInfo, setLoggedAuthInfo] = useState<any>();
  const handleTweetModal = () => {};
  const { authInfo } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (authInfo) {
      setLoggedAuthInfo(authInfo.username);
    }
  }, [authInfo]);
  const { userInfo } = useUserInfo(loggedAuthInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  const navItems = [
    {
      icon: home ? <AiFillHome size={32} /> : <AiOutlineHome size={32} />,
      text: 'Home',
      to: '/home',
    },
    {
      icon: messages ? <FaSearch size={32} /> : <BsSearch size={32} />,
      text: 'Search',
      to: `/search`,
    },
    {
      icon: !profile ? <FiUser size={32} /> : <FaUserAlt size={32} />,
      text: 'Profile',
      to: `/${authInfo ? authInfo.username : ''}`,
    },
    {
      icon: notifications ? (
        <AiFillBell size={32} />
      ) : (
        <AiOutlineBell size={32} />
      ),
      text: 'Notifications',
      to: `/notifications`,
    },
  
  ];
  return (
    <>
      <Box display={{ base: 'block', lg: 'none' }}>
        <Avatar
          onClick={onOpen}
          size={'md'}
          ml='3'
          mr='2'
          src={userInfo ? userInfo.profilePic : ''}></Avatar>
        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent px='0'>
            <DrawerCloseButton color='brand.text' />

            <DrawerBody bg='brand.bg' color='brand.text'>
              {navItems.map((item) => (
                <Flex
                  alignItems={'center'}
                  pt='8'
                  cursor='pointer'
                  onClick={() => {
                    history.push(item.to);
                  }}
                  _selected={{ color: 'brand.main', outline: '0px' }}
                  _focus={{ outline: '0px' }}
                  _hover={{ textDecor: 'none' }}>
                  {item.icon}
                  <Text
                    pl='4'
                    fontSize={18}
                    _active={{ bg: 'transparent' }}
                    _selected={{
                      color: 'brand.main',
                      borderColor: 'brand.main',
                    }}
                    _focus={{ outline: '0' }}>
                    {item.text}
                  </Text>
                </Flex>
              ))}

              <Box onClick={onClose} px='0'>
                <NavOpenTweet />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box
        h='100vh'
        display={{ base: 'none', lg: 'block' }}
        color='brand.text'
        px='5'
        py='5'
        pos='fixed'
        w='inherit'
        zIndex={999}>
        <FaTwitter size={35} color='#35B9F9' />
        {navItems.map((item) => (
          <Flex
            cursor='pointer'
            alignItems={'center'}
            pt='8'
            onClick={() => {
              history.push(item.to);
            }}>
            {item.icon}

            <Text
              pl='4'
              fontSize={18}
              _active={{ bg: 'transparent' }}
              _selected={{ color: 'brand.main', borderColor: 'brand.main' }}
              _focus={{ outline: '0' }}>
              {item.text}
            </Text>
          </Flex>
        ))}

        <Box onClick={onClose} px='0'>
          <NavOpenTweet />
        </Box>
        <Flex pos='absolute' bottom='40px' alignItems={'center'}>
          <Avatar mr='4' src={userInfo ? userInfo.profilePic : ''}></Avatar>
          <Flex flexDir={'column'} w='40'>
            <Text fontSize={20} fontWeight={'bold'}>
              {userInfo ? userInfo.name : ''}
            </Text>
            <Text fontSize={12} fontWeight={'normal'} color='whiteAlpha.500'>
              @{authInfo ? authInfo.username : ''}
            </Text>
          </Flex>
          <Box
            as={Link}
            zIndex={0}
            _hover={{ bg: 'none' }}
            px='2'
            rounded={'2xl'}>
            <Menu autoSelect={false}>
              <MenuButton>
                <BiDotsHorizontalRounded size={24} />
              </MenuButton>
              <MenuList bg='brand.bg' zIndex={999}>
                <MenuItem
                  onClick={() => {
                    history.push(`/${authInfo.username}`);
                  }}
                  _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
