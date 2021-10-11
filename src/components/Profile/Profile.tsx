import React from 'react';
import { Box, Grid } from '@chakra-ui/layout';
import Navbar from '../Navbar/Navbar';
import WhoToFollow from '../Home/WhoToFollow/WhoToFollow';
import User from './User';

function Profile() {
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
          <User />
        </Box>
        <Box w='full' display={{ md: 'block', base: 'none' }}>
          <WhoToFollow />
        </Box>
      </Grid>
    </>
  );
}

export default Profile;
