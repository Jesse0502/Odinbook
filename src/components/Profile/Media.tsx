import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { Image } from '@chakra-ui/react';
import signupHero from '../../assets/signupHero.png';
import useUserInfo from '../customHooks/useUserInfo';
function Media({ tweet }) {
  const { userInfo } = useUserInfo(tweet.username);

  return (
    <Box
      py='3'
      pos='relative'
      px='5'
      w='100%'
      borderBottom={'1px'}
      borderColor={'whiteAlpha.200'}>
      <Flex>
        <Avatar src={userInfo && userInfo.profilePic}></Avatar>
        <Flex pl='5' flexDir={'column'}>
          <Flex>
            <Text pr='1' fontWeight={'semibold'}>
              {userInfo && userInfo.name}
            </Text>
            <Text pl='1' color='whiteAlpha.600' fontWeight={'light'}>
              @{userInfo && userInfo.username}
            </Text>{' '}
            <BsDot size={26} color='#606363' />
            <Text color='whiteAlpha.600' fontWeight={'light'}>
              {tweet && new Date(tweet.createdAt).toLocaleDateString()}
            </Text>{' '}
          </Flex>
          <Image
            mt='2'
            rounded='2xl'
            src={tweet && tweet.tweetImage}
            maxH='300px'
            w='600px'
            objectFit={'cover'}></Image>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Media;
