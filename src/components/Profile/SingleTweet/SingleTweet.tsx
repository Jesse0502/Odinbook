import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@chakra-ui/layout';
import Navbar from '../../Navbar/Navbar';
import WhoToFollow from '../../Home/WhoToFollow/WhoToFollow';
import User from '../User';
import useAuth from '../../customHooks/useAuth';
import useFetch from '../../customHooks/useFetch';
import useUserInfo from '../../customHooks/useUserInfo';
import Post from './Post';

function SingleTweet(props) {
  const [url, setUrl] = useState<string | null>();
  const [loggedInUserInfo, setLoggedInUserInfo] = useState<null | any>(null);
  const [counter, setCounter] = useState<number>(1);
  const { authInfo } = useAuth();
  useEffect(() => {
    if (authInfo) {
      setUrl('/tweet/' + props.match.params.id);
    }
  });

  const { fetchData, fetchError, fetchIsPending } = useFetch(url, 'GET', '');
  useEffect(() => {
    if (fetchData) {
      // setLoggedInUserInfo(fetchData.user[0]);
      // setTimeout(() => {
      //   setCounter(counter + 1);
      // }, 1000);
      // console.log(fetchData);
    }
  }, [fetchData, counter]);
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
          <Navbar home={false} profile={true} messages={false} />
        </Box>
        <Box w={{ md: '650px', base: '100%' }}>
          <Post tweet={fetchData && fetchData.tweet} />
        </Box>
        <Box w='full' display={{ md: 'block', base: 'none' }}>
          <WhoToFollow />
        </Box>
      </Grid>
    </>
  );
}

export default SingleTweet;
