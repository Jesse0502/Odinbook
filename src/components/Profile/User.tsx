import React, { useEffect, useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/layout';
import {
  Button,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineFieldTime } from 'react-icons/ai';
import ProfileBanner from '../../assets/profileBanner.png';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Post from '../Home/Feed/Post';
import { BsArrowLeft } from 'react-icons/bs';
import Media from './Media';
import EditProfileModal from './EditProfileModal';
import { useHistory } from 'react-router';
import useAuth from '../customHooks/useAuth';

function User({ profileInfo, loggedIn, sameUser }) {
  const history = useHistory();
  const handleBackArrow = () => {
    history.push('/');
  };
  const { authInfo } = useAuth();

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
        src={
          profileInfo && profileInfo.profileBanner
            ? profileInfo.profileBanner
            : ProfileBanner
        }
        maxH='300px'
        objectFit={'cover'}
        w='full'></Image>
      <Flex justify='space-between'>
        <Box px='5' pos='relative'>
          <Avatar
            pos='absolute'
            size={'2xl'}
            top='-20'
            src={
              profileInfo && profileInfo.profilePic
                ? profileInfo.profilePic
                : ''
            }></Avatar>
          <Skeleton isLoaded={profileInfo} pt='16'>
            <Heading>{profileInfo ? profileInfo.name : ''}</Heading>
          </Skeleton>
          <Text color='whiteAlpha.600' pt='1' fontWeight={'light'}>
            @{authInfo ? authInfo.username : ''}
          </Text>
          {profileInfo && profileInfo.bio ? (
            <Flex alignItems={'center'} py='3'>
              <Text pl='1' color='brand.text' fontWeight={'light'}>
                {profileInfo.bio}
              </Text>
            </Flex>
          ) : (
            ''
          )}

          <Flex pt='2' alignItems={'center'}>
            {profileInfo && profileInfo.location ? (
              <Flex alignItems={'center'} pr='4'>
                <GrLocation size={20} color={'white'} />
                <Text pl='1' color='whiteAlpha.600' fontWeight={'light'}>
                  {profileInfo.location}
                </Text>
              </Flex>
            ) : (
              ''
            )}
            <Flex alignItems={'center'}>
              <AiOutlineFieldTime size={20} />
              <Text pl='1' color='whiteAlpha.600' fontWeight={'light'} w='max'>
                Joined{' '}
                {authInfo
                  ? `${new Date(authInfo.createdAt).toLocaleString('default', {
                      month: 'long',
                    })} ${new Date(authInfo.createdAt).getFullYear()}`
                  : ''}
              </Text>
            </Flex>
          </Flex>
          <Flex pt='4'>
            <Flex alignItems={'center'}>
              <Skeleton isLoaded={profileInfo}>
                <Text fontSize={18} pr='2' fontWeight={'bold'}>
                  {profileInfo ? profileInfo.following.length : ''}
                </Text>
              </Skeleton>
              <Text as={'span'} color='whiteAlpha.600' fontWeight={'light'}>
                Following
              </Text>
            </Flex>
            <Skeleton isLoaded={profileInfo}>
              <Flex pl='4' alignItems={'center'}>
                <Text fontSize={18} pr='2' fontWeight={'bold'}>
                  {profileInfo ? profileInfo.followers.length : ''}
                </Text>
                <Text as={'span'} color='whiteAlpha.600' fontWeight={'light'}>
                  Following
                </Text>
              </Flex>
            </Skeleton>
          </Flex>
        </Box>
        {sameUser && <EditProfileModal />}
        {!sameUser && (
          <Flex pos='relative'>
            <Button
              top='5'
              right='4'
              pos='absolute'
              p='5'
              rounded='full'
              bg='black'
              _hover={{ bg: 'brand.main' }}
              color='brand.text'>
              Follow
            </Button>
          </Flex>
        )}
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
            <Skeleton isLoaded={profileInfo}>
              {/* <Post />
              <Post /> */}
            </Skeleton>
          </TabPanel>
          <TabPanel px='0' pt='2'>
            <Skeleton isLoaded={profileInfo}>{/* <Post /> */}</Skeleton>
          </TabPanel>
          <TabPanel px='0' pt='2'>
            <Skeleton isLoaded={profileInfo}>
              <Media />
            </Skeleton>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default User;
