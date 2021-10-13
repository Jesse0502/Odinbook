import React, { useEffect, useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/layout';
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
import useFetch from '../customHooks/useFetch';
import _ from 'lodash';
import ShowFollowModal from './ShowFollowModal';
function User({ profileInfo, loggedIn, sameUser }) {
  const [url, setUrl] = useState<string>();
  const [profileTweets, setProfileTweets] = useState<any>();
  useEffect(() => {
    setUrl('/tweet');
  }, []);

  const { fetchData } = useFetch(url, 'GET', '');
  const history = useHistory();
  const handleBackArrow = () => {
    history.push('/');
  };
  const { authInfo } = useAuth();

  const handleFollow = () => {
    if (authInfo && profileInfo) {
      fetch(
        `http://localhost:3001/profile/addfollow/${
          authInfo && authInfo.id
        }?_method=PUT`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileInfo),
        }
      ).then((res) => {
        window.location.reload();
        return res.json();
      });
    }
  };
  // authInfo &&
  //   fetchData &&
  //   fetchData.tweets.map((tweet) => {
  //     if (_.find(tweet.likes, { _id: authInfo.id })) {
  //       console.log(tweet);
  //     }
  //   });
  // _.filter(fetchData && fetchData.tweets.likes, {
  //   _id: '6165ed90af0e547bde1b345a' ,
  // })

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
        <Flex pl='3' color='whiteAlpha.700'>
          {profileInfo &&
            fetchData &&
            _.filter(fetchData && fetchData.tweets, {
              username: profileInfo && profileInfo.username,
            }).length}
          <Text pl='1'>Tweets</Text>
        </Flex>
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
          <Heading pt='16'>{profileInfo ? profileInfo.name : ''}</Heading>

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
                {profileInfo
                  ? `${new Date(profileInfo.createdAt).toLocaleString(
                      'default',
                      {
                        month: 'long',
                      }
                    )} ${new Date(profileInfo.createdAt).getFullYear()}`
                  : ''}
              </Text>
            </Flex>
          </Flex>
          <Flex pt='4'>
            {/* <Flex alignItems={'center'}>
              <Text fontSize={18}  fontWeight={'bold'}>
                {profileInfo ? profileInfo.following.length : ''}
              </Text>
              <Text as={'span'} color='whiteAlpha.600' fontWeight={'light'}>
                Following
              </Text>
            </Flex> */}
            <Box pr='2'>
              <ShowFollowModal
                follow={profileInfo && profileInfo.following}
                type={'Following'}
              />
            </Box>
            <Box pl='4'>
              <ShowFollowModal
                follow={profileInfo && profileInfo.followers}
                type={'Followers'}
              />
            </Box>
          </Flex>
        </Box>
        {sameUser && <EditProfileModal />}
        {!sameUser && profileInfo && authInfo && (
          <Flex pos='relative'>
            <Button
              top='5'
              right='4'
              pos='absolute'
              p='5'
              rounded='full'
              onClick={handleFollow}
              bg={
                profileInfo &&
                authInfo &&
                _.find(profileInfo.followers, { _id: authInfo.id })
                  ? 'brand.main'
                  : 'black'
              }
              _hover={{ bg: 'brand.main' }}
              color='brand.text'>
              {profileInfo &&
              authInfo &&
              _.find(profileInfo.followers, { _id: authInfo.id })
                ? 'Following'
                : 'Follow'}
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
              {profileInfo &&
                fetchData &&
                _.filter(fetchData && fetchData.tweets, {
                  username: profileInfo && profileInfo.username,
                }).map((item) => <Post tweet={item} />)}
              <Heading textAlign='center' py='20' color='whiteAlpha.400'>
                Seems kinda empty from here
              </Heading>
            </Skeleton>
          </TabPanel>
          <TabPanel px='0' pt='2'>
            {profileInfo &&
              fetchData &&
              fetchData.tweets.map(
                (tweet) =>
                  // if (_.find(tweet.likes, { _id: authInfo.id })) {
                  _.find(tweet.likes, { _id: profileInfo._id }) && (
                    <Post tweet={tweet} />
                  )

                // }
              )}
          </TabPanel>
          <TabPanel px='0' pt='2'>
            {profileInfo &&
              fetchData &&
              _.filter(fetchData && fetchData.tweets, {
                username: profileInfo && profileInfo.username,
              }).map((item) => item.tweetImage && <Media tweet={item} />)}
            <Heading textAlign='center' py='20' color='whiteAlpha.400'>
              Seems kinda empty from here
            </Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default User;
