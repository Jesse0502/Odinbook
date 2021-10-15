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
import SingleComment from './SingleComment';
import PostComment from './PostComment';

import { BsArrowLeft } from 'react-icons/bs';
function Post({ tweet }) {
  const history = useHistory();

  const toast = useToast();
  const redirectToSingleTweetPage = () => {
    window.location.href = '/tweet/' + tweet._id;
  };
  const { authInfo } = useAuth();
  const { userInfo } = useUserInfo(tweet.username);
  // const [url, setUrl] = useState<string | null>(null);
  const [toastValue, setToastValue] = useState<any | null>(null);
  const handleLike = (e) => {
    console.log(e);
    fetch(
      `https://twitter-clone-69.herokuapp.com/tweet/like/${e}?_method=PUT`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: authInfo.id }),
      }
    )
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
    fetch(`https://twitter-clone-69.herokuapp.com/tweet/delete/${e}`, {
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
        history.push('/');
        setToastValue({ success: result.success });
      })
      .catch((err) => {
        setToastValue({ err });
      });
  };

  return (
    <Box overflow={'hidden'}>
      <Flex
        // border='1px'
        // borderColor='whiteAlpha.200'
        borderTop={0}
        alignItems={'center'}
        bg='brand.bg'
        w='96'
        color='brand.text'>
        <Box
          mx='5'
          py='4'
          w='max'
          onClick={() => {
            history.push('/');
          }}>
          <BsArrowLeft size={20} />
        </Box>
        <Text>Tweet</Text>
      </Flex>
      <Box
        py='3'
        pos='relative'
        minH='120vh'
        border='1px'
        w={{ md: '100%', base: '96' }}
        borderTop={'1px'}
        bg='brand.subText'
        color='brand.text'
        borderBottom={'1px'}
        borderColor={'whiteAlpha.200'}>
        <Flex px='5'>
          <Avatar
            src={userInfo && userInfo.profilePic}
            _hover={{ cursor: 'pointer' }}
            onClick={() => {
              history.push(`/${userInfo && userInfo.username}`);
            }}></Avatar>
          <Flex pl='5' flexDir={'column'} px='5'>
            <Flex>
              <Text pr='1' fontWeight={'semibold'}>
                {userInfo && userInfo.name}
              </Text>
            </Flex>
            <Text color='whiteAlpha.600' fontWeight={'light'}>
              @{tweet && tweet.username}
            </Text>{' '}
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
                {authInfo &&
                  userInfo &&
                  authInfo.username === userInfo.username && (
                    <MenuItem
                      onClick={() => {
                        handleTweetDelete(tweet && tweet._id);
                        toast({
                          title: 'Tweet Deleted',
                          status: 'error',
                          duration: 3000,
                          isClosable: false,
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
        <Box pt='5' px='5'>
          <Text
            pr='5'
            onClick={redirectToSingleTweetPage}
            id='tweet'
            fontSize={'xl'}
            dangerouslySetInnerHTML={{
              __html: `\n ${tweet && tweet.tweet}`,
            }}></Text>
          <Image
            mt='2'
            rounded='2xl'
            src={tweet && tweet.tweetImage}
            maxH='300px'
            w={{ lg: '600px', base: '80' }}
            objectFit={'cover'}></Image>
        </Box>
        <Box
          my='4'
          py='4'
          mx='5'
          borderBottom='1px'
          borderTop={'1px'}
          borderColor='whiteAlpha.400'>
          <Text color='whiteAlpha.600' fontWeight={'light'}>
            Posted:{' '}
            {tweet &&
              formatDistanceToNow(new Date(tweet.createdAt), {
                addSuffix: true,
              })}
          </Text>{' '}
        </Box>
        <Flex justify={'space-around'} mx='5'>
          <Flex alignItems={'center'} cursor='pointer' pr='12'>
            <FaRegComment size={26} />
          </Flex>
          <Flex
            alignItems={'center'}
            pr={{ lg: '12', base: '3' }}
            cursor='pointer'
            onClick={() => handleLike(tweet && tweet._id)}>
            {tweet && authInfo && _.find(tweet.likes, { _id: authInfo.id }) ? (
              <AiFillHeart size={31} color='crimson' />
            ) : (
              <AiOutlineHeart size={31} />
            )}
          </Flex>
        </Flex>
        <Flex
          mx='5'
          my='2'
          py='4'
          borderTop='1px'
          borderBottom={'1px'}
          borderColor={'whiteAlpha.400'}>
          <Text pr='3' fontSize={'lg'} color='whiteAlpha.500'>
            Comments : {tweet && tweet.comments.length}
          </Text>

          <Text pl='2' fontSize={'lg'} color='whiteAlpha.500'>
            Likes : {tweet && tweet.likes.length}
          </Text>
        </Flex>
        <PostComment tweetId={tweet && tweet._id} />

        <Text py='4' mx='5' fontSize='xl'>
          Comments
        </Text>
        {tweet &&
          tweet.comments.map((comment) => (
            <SingleComment
              comment={comment}
              tweetId={tweet && tweet._id}
              //_.orderBy(tweet.comment, ['createdAt'], ['asc'])
            />
          ))}
        {tweet && !tweet.comments.length && (
          <Flex justify={'center'} pt='32'>
            <Text fontSize={'2xl'} color='whiteAlpha.300'>
              No Comments to show
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default Post;
