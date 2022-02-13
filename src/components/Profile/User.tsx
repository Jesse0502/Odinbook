import React, { useEffect, useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/layout';
import { Button, Skeleton, Spinner } from '@chakra-ui/react';
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
import { AiOutlineMail } from 'react-icons/ai';
import ShowFollowModal from './ShowFollowModal';
import Navbar from '../Navbar/Navbar';
function User({ profileInfo, loggedIn, sameUser }) {
  const [url, setUrl] = useState<string>();
  const [handleFollowPending, sethandleFollowPending] =
    useState<boolean>(false);
  useEffect(() => {
    setUrl('/tweet');
  });

  const { fetchData } = useFetch(url, 'GET', '');
  const history = useHistory();
  const handleBackArrow = () => {
    history.push('/');
  };
  const { authInfo } = useAuth();

  const handleFollow = () => {
    sethandleFollowPending(true);
    if (authInfo && profileInfo) {
      fetch(
        `https://twitter-clone-69.herokuapp.com/profile/addfollow/${
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
        sethandleFollowPending(false);
        // history.go(0);
        return res.json();
      });
    }
  };

  return (
    <Box bg='#1F2223' color='brand.text'>
      <Flex
        justify={'space-between'}
        display={{ lg: 'none', base: 'flex' }}
        alignItems={'center'}
        py='2'>
        <Flex alignItems={'center'}>
          <Navbar
            home={false}
            profile={true}
            messages={false}
            notifications={false}
          />
          <Text pl='1' fontSize={'xl'}>
            Profile
          </Text>
        </Flex>
      </Flex>
      <Flex
        alignItems={'center'}
        h='12'
        display={{ lg: 'flex', base: 'none' }}
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
          {profileInfo && fetchData
            ? _.filter(fetchData && fetchData.tweets, {
                username: profileInfo && profileInfo.username,
              }).length
            : 0}
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
          <Heading pt='16'>
            {profileInfo ? (
              profileInfo.name
            ) : (
              <Text textAlign='center' py='5'>
                This user does not exist!
              </Text>
            )}
          </Heading>
          {profileInfo && profileInfo.username ? (
            <Text color='whiteAlpha.600' pt='1' fontWeight={'light'}>
              @{profileInfo ? profileInfo.username : ''}
            </Text>
          ) : (
            ''
          )}
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
            {profileInfo ? (
              <Flex alignItems={'center'}>
                <AiOutlineFieldTime size={20} />
                <Text
                  pl='1'
                  color='whiteAlpha.600'
                  fontWeight={'light'}
                  w='max'>
                  Joined{' '}
                  {new Date(profileInfo.createdAt).toLocaleString('default', {
                    month: 'long',
                  })}{' '}
                  {new Date(profileInfo.createdAt).getFullYear()}
                </Text>
              </Flex>
            ) : (
              ''
            )}
          </Flex>
          {profileInfo && profileInfo.following ? (
            <Flex pt='4'>
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
          ) : (
            ''
          )}
        </Box>
        {authInfo && sameUser && <EditProfileModal />}
        
        {!sameUser && profileInfo && (
          <Flex pos='relative'>
            <Button
              top='5'
              right='4'
              pos='absolute'
              p='5'
              minW='28'
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
              {!handleFollowPending ? (
                profileInfo &&
                authInfo &&
                _.find(profileInfo.followers, { _id: authInfo.id }) ? (
                  'Following'
                ) : (
                  'Follow'
                )
              ) : (
                <Spinner />
              )}
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
            </Skeleton>
          </TabPanel>
          <TabPanel px='0' pt='2'>
            {profileInfo &&
              fetchData &&
              fetchData.tweets.map(
                (tweet) =>
                  _.find(tweet.likes, { _id: profileInfo._id }) && (
                    <Post tweet={tweet} />
                  )
              )}
          </TabPanel>
          <TabPanel px='0' pt='2'>
            {profileInfo &&
              fetchData &&
              _.filter(fetchData && fetchData.tweets, {
                username: profileInfo && profileInfo.username,
              }).map((item) => item.tweetImage && <Media tweet={item} />)}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default User;
