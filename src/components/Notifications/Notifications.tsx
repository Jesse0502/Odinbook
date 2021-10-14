import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, Grid, Text } from '@chakra-ui/layout';
import Navbar from '../Navbar/Navbar';
import WhoToFollow from '../Home/WhoToFollow/WhoToFollow';
// import User from './User';
import useAuth from '../customHooks/useAuth';
import useFetch from '../customHooks/useFetch';
import useUserInfo from '../customHooks/useUserInfo';
import Notification from './Notification';
import { BsArrowLeft } from 'react-icons/bs';
import { Spinner } from '@chakra-ui/spinner';
import { useHistory } from 'react-router';
function Notifications() {
  const history = useHistory();
  const { authInfo } = useAuth();
  const { userInfo } = useUserInfo(authInfo && authInfo.username);
  return (
    <>
      <Grid
        templateColumns={{ md: '3fr 6fr 3fr' }}
        px={{ md: '36' }}
        bg='brand.bg'
        minH='100vh'
        gap='5'>
        <Box pos='relative' w='300px' display={{ md: 'block', base: 'none' }}>
          <Navbar
            home={false}
            profile={false}
            messages={false}
            notifications={true}
          />
        </Box>
        <Box
          w={{ md: '650px', base: '100%' }}
          border='1px'
          h='100vh'
          overflow={'auto'}
          borderColor={'whiteAlpha.400'}>
          <Flex
            py='3'
            bg='brand.subText'
            borderBottom={'1px'}
            borderColor={'whiteAlpha.400'}
            pl='2'>
            <Box
              cursor={'pointer'}
              onClick={() => {
                history.push('/home');
              }}>
              <BsArrowLeft color='white' size={24} />
            </Box>
            <Text color='brand.text' pl='4'>
              Notifications
            </Text>
          </Flex>
          {userInfo && userInfo.notifications ? (
            userInfo.notifications && userInfo.notifications.length ? (
              userInfo.notifications.map((notification) => (
                <Notification notification={notification} />
              ))
            ) : (
              <Center pt='72' fontSize={'2xl'}>
                <Text color='whiteAlpha.400'>No Notifications yet</Text>
              </Center>
            )
          ) : (
            <Center pt='6'>
              <Spinner size='lg' thickness='3px' color='brand.main' />
            </Center>
          )}
        </Box>
        <Box w='full' display={{ md: 'block', base: 'none' }}>
          <WhoToFollow />
        </Box>
      </Grid>
    </>
  );
}

export default Notifications;
