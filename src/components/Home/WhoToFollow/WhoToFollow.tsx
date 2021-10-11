import React from 'react';
import { Box, Text } from '@chakra-ui/layout';
import FollowSuggestion from './FollowSuggestion';
function WhoToFollow() {
  return (
    <Box bg='brand.bg' color='brand.text' pos='fixed' w='350px'>
      <Text py='5' fontSize={'2xl'} fontWeight={'bold'}>
        Who to follow
      </Text>
      <Box bg='#202929' rounded='2xl' px='5' py='5'>
        <FollowSuggestion />
      </Box>
    </Box>
  );
}

export default WhoToFollow;
