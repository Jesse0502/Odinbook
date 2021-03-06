import React from 'react';
import { Box, Grid } from '@chakra-ui/layout';
import Feeds from './Feed/Feeds';
import Navbar from '../Navbar/Navbar';
import WhoToFollow from './WhoToFollow/WhoToFollow';
function Home() {
  return (
    <>
      <Grid
        templateColumns={{ md: '3fr 6fr 3fr' }}
        px={{ md: '36' }}
        bg='brand.bg'
        gap='5'>
        <Box pos='relative' w='300px' display={{ md: 'block', base: 'none' }}>
          <Navbar home={true} profile={false} />
        </Box>
        <Box w={{ md: '650px', base: '100%' }}>
          <Feeds />
        </Box>
        <Box w='full' display={{ md: 'block', base: 'none' }}>
          <WhoToFollow />
        </Box>
      </Grid>
    </>
  );
}

export default Home;
