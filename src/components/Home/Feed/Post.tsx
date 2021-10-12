import React, { useEffect, useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Link, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuList, MenuItem, Image } from '@chakra-ui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import useUserInfo from '../../customHooks/useUserInfo';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useAuth from '../../customHooks/useAuth';
import useFetch from '../../customHooks/useFetch';

function Post({ tweet }) {
  const redirectToSingleTweetPage = () => {
    window.location.href = '/tweet/' + tweet._id;
  };
  const { authInfo } = useAuth();
  const { userInfo } = useUserInfo(tweet.username);
  const [url, setUrl] = useState<string | null>(null);
  const [postBody, setPostBody] = useState<string | null>(null);
  const handleTweetDelete = (e) => {
    setUrl(`/tweet/delete/${e}`);

    // alert(e);
  };
  const { fetchData } = useFetch(url, 'POST', '');
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
              @{tweet.username}
            </Text>{' '}
            <BsDot size={26} color='#606363' />
            <Text color='whiteAlpha.600' fontWeight={'light'}>
              {formatDistanceToNow(new Date(tweet.createdAt), {
                addSuffix: true,
              })}
            </Text>{' '}
          </Flex>
          <Text
            pr='5'
            onClick={redirectToSingleTweetPage}
            id='tweet'
            dangerouslySetInnerHTML={{
              __html: `\n ${tweet.tweet}`,
            }}></Text>
          <Image
            mt='2'
            rounded='2xl'
            src={tweet.tweetImage}
            maxH='300px'
            w='600px'
            objectFit={'cover'}></Image>
        </Flex>
        <Box pos='absolute' right={5}>
          <Menu autoSelect={false}>
            <MenuButton>
              <BiDotsHorizontalRounded size={24} />
            </MenuButton>
            <MenuList bg='brand.bg'>
              {authInfo && userInfo && authInfo.username === userInfo.username && (
                <MenuItem
                  onClick={() => handleTweetDelete(tweet._id)}
                  _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                  Delete
                </MenuItem>
              )}
              <MenuItem _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                Open Closed Tab
              </MenuItem>
              <MenuItem _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                Open File
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Flex py='2' pl='16'>
        <Flex alignItems={'center'} pr='12'>
          <FaRegComment size={18} />
          <Text pl='3'>{tweet.comments.length}</Text>
        </Flex>
        <Flex alignItems={'center'} pr='12'>
          <AiOutlineHeart size={20} />
          <Text pl='3'>{tweet.likes.length}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Post;
