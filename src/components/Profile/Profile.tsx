import React, { useEffect, useState } from 'react';
import { Box, Center, Grid } from '@chakra-ui/layout';
import Navbar from '../Navbar/Navbar';
import WhoToFollow from '../Home/WhoToFollow/WhoToFollow';
import User from './User';
import useAuth from '../customHooks/useAuth';
import useFetch from '../customHooks/useFetch';
import useUserInfo from '../customHooks/useUserInfo';
import { Spinner } from '@chakra-ui/spinner';

function Profile(props) {
  const [url, setUrl] = useState<string | null>();
  const [loggedInUserInfo, setLoggedInUserInfo] = useState<
    null | any | boolean
  >(null);
  const [counter, setCounter] = useState<number>(1);
  const { authInfo } = useAuth();
  useEffect(() => {
    if (authInfo) {
      setUrl('/profile/' + authInfo.username);
    }
  });

  const { fetchData, fetchError, fetchIsPending } = useFetch(url, 'GET', '');
  useEffect(() => {
    if (fetchData) {
      setLoggedInUserInfo(fetchData.user[0]);
      setTimeout(() => {
        setCounter(counter + 1);
      }, 100);
    }
  });
  const { userInfo } = useUserInfo(props.match.params.user);
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
            profile={true}
            messages={false}
            notifications={false}
          />
        </Box>
        <Box w={{ md: '650px', base: '100%' }}>
          {(userInfo && loggedInUserInfo) || userInfo === undefined ? (
            <User
              profileInfo={userInfo && userInfo}
              loggedIn={loggedInUserInfo && loggedInUserInfo}
              sameUser={
                userInfo &&
                loggedInUserInfo &&
                userInfo.username === loggedInUserInfo.username
              }
            />
          ) : (
            <Center pt='4'>
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

export default Profile;
