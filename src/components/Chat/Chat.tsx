import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, Grid, HStack, Text } from '@chakra-ui/layout';
import Feeds from '../Home/Feed/Feeds';
import Navbar from '../Navbar/Navbar';
import WhoToFollow from '../Home/WhoToFollow/WhoToFollow';
import Messages from './Messages/Messages';
import useAuth from '../customHooks/useAuth';
import useUserInfo from '../customHooks/useUserInfo';
import useFetch from '../customHooks/useFetch';
import ChatsAvailable from './ChatsAvailable';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router';
import { Spinner } from '@chakra-ui/spinner';
function Chat() {
  const { authInfo } = useAuth();
  const { userInfo } = useUserInfo(authInfo && authInfo.username);
  const history = useHistory();
  const handleSearchUser = (e) => {
    history.push(e.target[0].value);
  };
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
          <Navbar
            home={false}
            profile={false}
            messages={true}
            notifications={false}
          />
        </Box>
        <Box w={{ base: '100%' }} border='1px' borderColor={'whiteAlpha.400'}>
          <Flex
            justify={'space-between'}
            alignItems={'center'}
            py='3'
            bg='brand.subText'>
            <Flex alignItems={'center'}>
              <Box display={{ base: 'flex', md: 'none' }}>
                <Navbar
                  home={false}
                  profile={false}
                  messages={true}
                  notifications={false}
                />
              </Box>

              <Text pl='3' fontSize='2xl'>
                Following
              </Text>
            </Flex>
            <HStack
              display={{ lg: 'flex', base: 'none' }}
              alignItems={'center'}
              cursor='pointer'
              _selected={{ color: 'brand.main', outline: '0px' }}
              _focus={{ outline: '0px' }}
              _hover={{ textDecor: 'none' }}>
              <Text pl='4' fontSize={18} color='whiteAlpha.600'>
                Search User
              </Text>

              <form onSubmit={handleSearchUser}>
                <Box pos='relative' mr='4'>
                  <Input rounded={'full'} w='72' placeholder='Enter Username' />
                  <Button
                    pos='absolute'
                    right={0}
                    w='20'
                    type='submit'
                    bg='brand.main'
                    roundedRight={'full'}
                    _hover={{ bg: 'brand.main' }}
                    _active={{ bg: 'brand.main' }}
                    color='brand.text'>
                    Search
                  </Button>
                </Box>
              </form>
            </HStack>
          </Flex>
          {userInfo ? (
            userInfo.following.map((follow) => (
              <ChatsAvailable follow={follow} />
            ))
          ) : (
            <Center pt='3'>
              <Spinner size='lg' color='brand.main' thickness='3px' />
            </Center>
          )}
          {/* <Messages /> */}
        </Box>
      </Grid>
    </>
  );
}

export default Chat;
