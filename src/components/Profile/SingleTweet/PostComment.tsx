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
  Textarea,
  CircularProgress,
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
function Comments({ tweetId }) {
  const [tweetLength, setTweetLength] = useState<number>(0);
  const { authInfo } = useAuth();
  const [url, setUrl] = useState<string | null>(null);
  const [postBody, setPostBody] = useState<any>();
  const handleTweetLength = (e) => {
    setTweetLength((e.target.value.trim().length / 280) * 100);
  };
  const handleTextAreaHeight = (e) => {
    e.target.style.height = '5px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };
  const { userInfo } = useUserInfo(authInfo && authInfo.username);
  const handleTweetPost = (e) => {
    e.target[0].innerHTML = e.target[0].value;
    e.preventDefault();
    const tweetBody = {
      tweet: e.target[0].innerHTML,
      username: userInfo && userInfo.username,
      name: userInfo && userInfo.name,
      createdAt: new Date(),
    };
    setUrl('/tweet/comment/' + tweetId + '?_method=PUT');
    setPostBody(tweetBody);
    console.log(tweetBody);
  };
  const clearTextArea = () => {};
  const { fetchData, fetchIsPending } = useFetch(url, 'POST', postBody);
  useEffect(() => {
    if (!fetchIsPending) {
      const formData = document.querySelector('.commentFormText')!;
      if (formData) {
        console.log((formData[0].innerHTML = null));
      }
    }
  }, [fetchData]);
  return (
    <Box>
      <Box
        py={{ lg: '4', base: '7' }}
        pos='relative'
        px='5'
        w={{ lg: '100%', base: '96' }}
        minH='max'
        borderBottom={'1px'}
        bg='brand.subText'
        color='brand.text'
        borderColor={'whiteAlpha.200'}>
        <form className='commentFormText' onSubmit={(e) => handleTweetPost(e)}>
          <Flex w='max' h='max' overflowWrap={'break-word'}>
            <Avatar src={userInfo && userInfo.profilePic}></Avatar>
            <Flex
              pl='5'
              flexDir={'column'}
              maxW={{ lg: '600px', base: '96' }}
              minH='max'
              overflowWrap={'anywhere'}>
              <Flex>
                <Text pr='1' fontWeight={'semibold'}>
                  {userInfo && userInfo.name}
                </Text>
                <Text pl='1' color='whiteAlpha.600' fontWeight={'light'}>
                  @{userInfo && userInfo.username}
                </Text>{' '}
              </Flex>
              <Textarea
                border='0'
                resize={'none'}
                w={{ lg: '100%', base: '64' }}
                onInput={(e) => handleTextAreaHeight(e)}
                overflowY={'hidden'}
                maxLength={280}
                maxH={'300px'}
                onChange={(e) => handleTweetLength(e)}
                placeholder='Tweet your reply'
                fontSize='xl'
                _placeholder={{ fontSize: 'lg' }}
                _focus={{ outline: '0px' }}
                px={0}></Textarea>
            </Flex>

            <Flex
              w='96'
              pt={{ lg: '10', base: '20' }}
              pl={{ lg: '16' }}
              alignItems={'center'}>
              <Flex pos='absolute' alignItems={'center'} bottom='3' right={5}>
                <Box>
                  <CircularProgress
                    value={tweetLength}
                    size={8}
                    thickness='12px'
                    color={tweetLength > 80 ? 'red' : 'twitter.600'}
                  />
                </Box>
                <Text px='3'>|</Text>
                <Button
                  colorScheme='twitter'
                  type='submit'
                  isDisabled={!tweetLength}
                  rounded='full'
                  w='20'>
                  Tweet
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default Comments;
