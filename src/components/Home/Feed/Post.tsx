import React, { useEffect, useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Link, Text } from '@chakra-ui/layout';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
} from '@chakra-ui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useUserInfo from '../../customHooks/useUserInfo';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useAuth from '../../customHooks/useAuth';
import useFetch from '../../customHooks/useFetch';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import _ from 'lodash';
function Post({ tweet }) {
  const history = useHistory();
  const toast = useToast();
  const redirectToSingleTweetPage = () => {
    history.push('/tweet/' + tweet._id);
  };
  const { authInfo } = useAuth();
  const { userInfo } = useUserInfo(tweet.username);
  const [toastValue, setToastValue] = useState<any | null>(null);
  const handleLike = (e) => {
    console.log(e);
    fetch(`http://localhost:3001/tweet/like/${e}?_method=PUT`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: authInfo.id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // console.log(result.success);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  // console.log(tweet && authInfo && _.find(tweet.likes, { _id: authInfo.id }));
  const handleTweetDelete = (e) => {
    fetch(`http://localhost:3001/tweet/delete/${e}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setToastValue({ success: result.success });
      })
      .catch((err) => {
        setToastValue({ err });
      });
  };

  return (
    <Box
      py='3'
      pos='relative'
      px='5'
      w='100%'
      borderBottom={'1px'}
      borderColor={'whiteAlpha.200'}>
      <Flex>
        <Avatar
          src={userInfo && userInfo.profilePic}
          _hover={{ cursor: 'pointer' }}
          onClick={() => {
            history.push(`/${userInfo.username}`);
          }}></Avatar>
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
            onClick={redirectToSingleTweetPage}
            w='600px'
            objectFit={'cover'}></Image>
        </Flex>
        <Box pos='absolute' right={5}>
          <Menu autoSelect={false}>
            <MenuButton>
              <BiDotsHorizontalRounded size={24} />
            </MenuButton>
            <MenuList bg='brand.bg'>
              {' '}
              <MenuItem
                onClick={() => {
                  history.push(`/${userInfo.username}`);
                }}
                _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                Profile
              </MenuItem>
              {authInfo && userInfo && authInfo.username === userInfo.username && (
                <MenuItem
                  onClick={() => {
                    handleTweetDelete(tweet._id);
                    toast({
                      title: 'Tweet Deleted',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                  _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                  Delete
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Flex py='2' pl='20'>
        <Flex
          alignItems={'center'}
          cursor='pointer'
          pr='12'
          onClick={redirectToSingleTweetPage}>
          <FaRegComment size={20} />
          <Text pl='3'>{tweet && tweet.comments.length}</Text>
        </Flex>
        <Flex
          alignItems={'center'}
          pr='12'
          cursor='pointer'
          onClick={() => {
            handleLike(tweet && tweet._id);
          }}>
          {tweet && authInfo && _.find(tweet.likes, { _id: authInfo.id }) ? (
            <AiFillHeart size={22} color='crimson' />
          ) : (
            <AiOutlineHeart size={20} />
          )}

          <Text pl='2'>{tweet && tweet.likes.length}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Post;
