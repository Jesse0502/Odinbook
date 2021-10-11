import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';

function FollowSuggestion() {
  return (
    <Flex color='brand.text' alignItems={'center'} pos='relative'>
      <Avatar></Avatar>
      <Flex pl='3' flexDir={'column'}>
        <Text>Name</Text>
        <Text color='whiteAlpha.500' maxW='140px'>
          @username
        </Text>
      </Flex>
      <Button
        bg='brand.bg'
        color='white'
        pos='absolute'
        right={0}
        _hover={{ bg: 'brand.main' }}
        rounded={'lg'}>
        Follow
      </Button>
    </Flex>
  );
}

export default FollowSuggestion;
