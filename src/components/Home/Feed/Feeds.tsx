import React, { useEffect, useState } from 'react';
import Post from './Post';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import PostTweet from './PostTweet';
import { Avatar } from '@chakra-ui/avatar';
import Navbar from '../../Navbar/Navbar';
import useFetch from '../../customHooks/useFetch';
import { CircularProgress, Spinner } from '@chakra-ui/react';
function Feeds() {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    setUrl('/tweet');
  }, []);

  const { fetchData } = useFetch(url, 'GET', '');
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
        minW={{ base: '96', md: '648px' }}
        zIndex={999}
        w='96'
        bg='#1F2223'>
        <Flex alignItems={'center'}>
          <Box display={{ lg: 'none', base: 'block' }}>
            <Navbar
              home={true}
              profile={false}
              messages={false}
              notifications={false}
            />
          </Box>
          <Text px='3' fontSize={20}>
            Home
          </Text>
        </Flex>
      </Box>
      <Box pt='16' w='full'>
        <PostTweet onClose={() => console.log("closed")} />
        {fetchData ? (
          fetchData.tweets.map((tweet) => <Post tweet={tweet} />)
        ) : (
          <Center pt='8'>
            <Spinner size='lg' thickness='3px' color='brand.main' />
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default Feeds;
