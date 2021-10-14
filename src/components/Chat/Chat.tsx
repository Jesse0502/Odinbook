import React, { useEffect, useState } from 'react';
import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import Feeds from '../Home/Feed/Feeds';
import Navbar from '../Navbar/Navbar';
import WhoToFollow from '../Home/WhoToFollow/WhoToFollow';
import Messages from './Messages/Messages';
import useAuth from '../customHooks/useAuth';
import useUserInfo from '../customHooks/useUserInfo';
import useFetch from '../customHooks/useFetch';
import ChatsAvailable from './ChatsAvailable';
function Chat() {
  const { authInfo } = useAuth();
  const { userInfo } = useUserInfo(authInfo && authInfo.username);
  return (
    <>
      <Grid
        templateColumns={{ md: '3fr 9fr', base: '12fr' }}
        px={{ md: '36' }}
        bg='brand.bg'
        minH='100vh'
        color='brand.text'
        gap='5'>
        <Box pos='relative' w='300px' display={{ md: 'block', base: 'none' }}>
          <Navbar home={false} profile={false} messages={true} />
        </Box>
        <Box w={{ base: '100%' }} border='1px' borderColor={'whiteAlpha.400'}>
          <Flex
            justify={'space-between'}
            alignItems={'center'}
            py='3'
            bg='brand.subText'>
            <Flex alignItems={'center'}>
              <Box display={{ base: 'inherit', md: 'none' }}>
                <Navbar home={false} profile={false} messages={true} />
              </Box>

              <Text pl='3' fontSize='2xl'>
                Following
              </Text>
            </Flex>
          </Flex>
          {userInfo &&
            userInfo.following.map((follow) => (
              <ChatsAvailable follow={follow} />
            ))}
          {/* <Messages /> */}
        </Box>
      </Grid>
    </>
  );
}

export default Chat;
