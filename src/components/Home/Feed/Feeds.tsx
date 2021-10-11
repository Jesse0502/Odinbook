import React from 'react';
import Post from './Post';
import { Box, Flex, Text } from '@chakra-ui/layout';
import PostTweet from './PostTweet';
import { Avatar } from '@chakra-ui/avatar';
import Navbar from '../../Navbar/Navbar';
function Feeds() {
  return (
    <Box
      color='brand.text'
      bg='#1F2223'
      border='1px'
      w='full'
      borderColor={'whiteAlpha.300'}
      minH='150vh'>
      <Box
        pos='fixed'
        py='3'
        fontSize={26}
        top='0'
        borderBottom='1px'
        borderColor={'whiteAlpha.300'}
        minW={{ base: 'full', md: '648px' }}
        zIndex={999}
        bg='#1F2223'>
        <Flex alignItems={'center'}>
          <Box display={{ lg: 'none', base: 'block' }}>
            <Navbar home={true} profile={false} />
          </Box>
          <Text px='3' fontSize={20}>
            Home
          </Text>
        </Flex>
      </Box>
      <Box pt='16'>
        <PostTweet />
        <Post />
        <Post />
        <Post />
        <Post />
      </Box>
    </Box>
  );
}

export default Feeds;
