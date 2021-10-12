import React, { useEffect, useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image, Input, Textarea } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { Button } from '@chakra-ui/react';
import { BiImageAdd } from 'react-icons/bi';
import { Upload, message } from 'antd';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import useFetch from '../../customHooks/useFetch';
import useAuth from '../../customHooks/useAuth';
import useUserInfo from '../../customHooks/useUserInfo';
function PostTweet() {
  const [userUrl, setUserUrl] = useState<null | string>(null);
  const { authInfo } = useAuth();

  const { userInfo } = useUserInfo(authInfo && authInfo.username);
  const handleTweetLength = (e) => {
    setTweetLength((e.target.value.length / 280) * 100);
  };
  const handleTextAreaHeight = (e) => {
    e.target.style.height = '5px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };
  const [loading, setLoading] = useState<any>(false);
  const [tweetLength, setTweetLength] = useState<number>(0);

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) =>
        setLoading({
          imageUrl,
          loading: false,
        })
      );
    }
  };
  const handleRemoveImage = () => {
    setLoading({ imageUrl: '' });
  };
  const [url, setUrl] = useState<string | null>(null);
  const [postBody, setPostBody] = useState<any>();

  const handleTweetPost = (e) => {
    e.target[0].innerHTML = e.target[0].value;
    e.preventDefault();
    const tweetBody = {
      tweetImage: loading.imageUrl ?? '',
      tweet: e.target[0].innerHTML,
      username: userInfo && userInfo.username,
      name: userInfo && userInfo.name,
    };
    setUrl('/tweet');
    setPostBody(tweetBody);
    console.log(tweetBody);
  };
  const { fetchData } = useFetch(url, 'POST', postBody);
  useEffect(() => {
    if (fetchData && fetchData.sucess) {
      window.location.reload();
    }
  }, [fetchData]);
  return (
    <Box
      py={{ lg: '3', base: '7' }}
      pos='relative'
      px='5'
      w='100%'
      minH='max'
      borderBottom={'1px'}
      borderColor={'whiteAlpha.200'}>
      <form onSubmit={(e) => handleTweetPost(e)}>
        <Flex w='max' h='max' overflowWrap={'break-word'}>
          <Avatar src={userInfo && userInfo.profilePic}></Avatar>
          <Flex
            pl='5'
            flexDir={'column'}
            maxW='600px'
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
              minH='30px'
              w='540px'
              onInput={(e) => handleTextAreaHeight(e)}
              overflowY={'hidden'}
              maxLength={280}
              maxHeight={'300px'}
              onChange={(e) => handleTweetLength(e)}
              placeholder="What's happening..."
              fontSize='xl'
              _placeholder={{ fontSize: 'lg' }}
              _focus={{ outline: '0px' }}
              px={0}></Textarea>
            {loading.imageUrl ? (
              <Box pos='relative'>
                <Button
                  pos='absolute'
                  top='-2'
                  right='-2'
                  colorScheme={'twitter'}
                  bg='brand.main'
                  onClick={handleRemoveImage}
                  rounded='full'>
                  X
                </Button>
                <Image
                  src={loading.imageUrl}
                  my='2'
                  rounded='2xl'
                  maxH='300px'
                  w='full'
                  objectFit={'cover'}></Image>
              </Box>
            ) : (
              ''
            )}
          </Flex>
        </Flex>
        <Text pl='16' color={loading.error ? 'red' : 'brand.main'}>
          {loading.error ? loading.error : ''}
          {loading.loading ? 'uploading...' : ''}
        </Text>
        <Flex pt='10' pl='16' alignItems={'center'}>
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
            <Button colorScheme='twitter' type='submit' rounded='full' w='20'>
              Tweet
            </Button>
          </Flex>
          <Box pos='absolute' bottom={3}>
            <Upload
              name='profileBanner'
              listType='picture-card'
              showUploadList={false}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              onChange={handleChange}>
              <BiImageAdd size={28} color='#1A94DA' />
            </Upload>
          </Box>
        </Flex>
      </form>
    </Box>
  );
}

export default PostTweet;
