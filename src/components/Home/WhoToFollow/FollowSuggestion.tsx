import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import * as _ from 'lodash';
import { useHistory } from 'react-router';
function FollowSuggestion({ users, handleFollow, authInfo }) {
  const history = useHistory();
  return (
    <Flex color='brand.text' alignItems={'center'} pos='relative' py='3'>
      <Avatar
        src={users && users.profilePic}
        onClick={() => {
          history.push(`/${users.username}`);
        }}></Avatar>
      <Flex pl='3' flexDir={'column'}>
        <Text>{users && users.name}</Text>
        <Text color='whiteAlpha.500' maxW='140px'>
          @{users && users.username}
        </Text>
      </Flex>
      <Button
        color='white'
        pos='absolute'
        onClick={() => handleFollow(users)}
        right={0}
        bg={
          users && authInfo && _.find(users.followers, { _id: authInfo.id })
            ? 'brand.main'
            : 'black'
        }
        _hover={{ bg: 'brand.main' }}
        rounded={'lg'}>
        {users && authInfo && _.find(users.followers, { _id: authInfo.id })
          ? 'Following'
          : 'Follow'}
      </Button>
    </Flex>
  );
}

export default FollowSuggestion;
