import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@chakra-ui/layout';
import Navbar from '../Navbar/Navbar';
import WhoToFollow from '../Home/WhoToFollow/WhoToFollow';
import User from './User';
import useAuth from '../customHooks/useAuth';
import useFetch from '../customHooks/useFetch';
import useUserInfo from '../customHooks/useUserInfo';

function Profile(props) {
  const [url, setUrl] = useState<string | null>();
  const [loggedInUserInfo, setLoggedInUserInfo] = useState<null | any>(null);
  const { authInfo } = useAuth();
  useEffect(() => {
    if (authInfo) {
      setUrl('/profile/' + authInfo.username);
      console.log('running url');
    }
  });

  const { fetchData, fetchError, fetchIsPending } = useFetch(url, 'GET', '');
  useEffect(() => {
    if (fetchData) {
      setLoggedInUserInfo(fetchData.user[0]);
      console.log(fetchData.user[0]);
    }
  }, [fetchData]);
  const profileInfo = props.match.params.user;
  const { userInfo } = useUserInfo(profileInfo);
  return (
    <>
      <Grid
        templateColumns={{ md: '3fr 6fr 3fr' }}
        px={{ md: '36' }}
        bg='brand.bg'
        minH='100vh'
        gap='5'>
        <Box pos='relative' w='300px' display={{ md: 'block', base: 'none' }}>
          <Navbar home={false} profile={true} />
        </Box>
        <Box w={{ md: '650px', base: '100%' }}>
          <User
            profileInfo={userInfo}
            loggedIn={loggedInUserInfo}
            sameUser={
              userInfo &&
              loggedInUserInfo &&
              userInfo.username === loggedInUserInfo.username
            }
          />
        </Box>
        <Box w='full' display={{ md: 'block', base: 'none' }}>
          <WhoToFollow />
        </Box>
      </Grid>
    </>
  );
}

export default Profile;
