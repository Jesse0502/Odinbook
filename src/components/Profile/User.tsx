import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineFieldTime } from 'react-icons/ai';
import ProfileBanner from '../../assets/profileBanner.png';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Post from '../Home/Feed/Post';
import { BsArrowLeft } from 'react-icons/bs';
import Media from './Media';
import EditProfileModal from './EditProfileModal';
import { useHistory } from 'react-router';
function User() {
  const history = useHistory();
  const handleBackArrow = () => {
    history.push('/');
  };
  return (
    <Box bg='#1F2223' color='brand.text'>
      <Flex
        alignItems={'center'}
        h='12'
        onClick={handleBackArrow}
        borderBottom='1px'
        borderColor={'whiteAlpha.200'}
        w='650px'
        bg='brand.subText'
        zIndex={999}
        pos='fixed'>
        <Box as={Link} _hover={{ bg: 'whiteAlpha.300' }} p='3'>
          <BsArrowLeft size={20} />
        </Box>
        <Text pl='3' color='whiteAlpha.700'>
          123 Tweets
        </Text>
      </Flex>
      <Image
        src={ProfileBanner}
        maxH='300px'
        objectFit={'cover'}
        w='full'></Image>
      <Flex justify='space-between'>
        <Box px='5' pos='relative'>
          <Avatar pos='absolute' size={'2xl'} top='-20'></Avatar>
          <Heading pt='16'>Name</Heading>
          <Text color='whiteAlpha.600' pt='1' fontWeight={'light'}>
            @Username
          </Text>
          <Flex pt='2' alignItems={'center'}>
            <Flex alignItems={'center'} pr='4'>
              <GrLocation size={20} color={'white'} />
              <Text pl='1' color='whiteAlpha.600' fontWeight={'light'}>
                ok
              </Text>
            </Flex>
            <Flex alignItems={'center'}>
              <AiOutlineFieldTime size={20} />
              <Text pl='1' color='whiteAlpha.600' fontWeight={'light'} w='max'>
                Joined 30 days ago
              </Text>
            </Flex>
          </Flex>
          <Flex pt='4'>
            <Flex alignItems={'center'}>
              <Text fontSize={18} pr='2' fontWeight={'bold'}>
                60
              </Text>
              <Text as={'span'} color='whiteAlpha.600' fontWeight={'light'}>
                Following
              </Text>
            </Flex>
            <Flex pl='4' alignItems={'center'}>
              <Text fontSize={18} pr='2' fontWeight={'bold'}>
                3
              </Text>
              <Text as={'span'} color='whiteAlpha.600' fontWeight={'light'}>
                Following
              </Text>
            </Flex>
          </Flex>
        </Box>
        <EditProfileModal />
      </Flex>
      <Tabs pt='4' borderColor={'whiteAlpha.200'} isFitted>
        <TabList justifyContent={'space-between'}>
          <Tab
            fontSize={16}
            _active={{ bg: 'transparent' }}
            _selected={{ color: 'brand.main', borderColor: 'brand.main' }}
            _focus={{ outline: '0' }}>
            Tweets
          </Tab>
          <Tab
            fontSize={16}
            _active={{ bg: 'transparent' }}
            _selected={{ color: 'brand.main', borderColor: 'brand.main' }}
            _focus={{ outline: '0' }}>
            Likes
          </Tab>
          <Tab
            fontSize={16}
            _active={{ bg: 'transparent' }}
            _selected={{ color: 'brand.main', borderColor: 'brand.main' }}
            _focus={{ outline: '0' }}>
            Media
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px='0' pt='2'>
            <Post />
            <Post />
          </TabPanel>
          <TabPanel px='0' pt='2'>
            <Post />
          </TabPanel>
          <TabPanel px='0' pt='2'>
            <Media />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default User;
