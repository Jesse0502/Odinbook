import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import * as _ from 'lodash';
import { useHistory } from 'react-router';
import { Spinner } from '@chakra-ui/react';
function FollowSuggestion({ users, authInfo }) {
  const [fetchDataPending, setfetchDataPending] = useState<boolean>(false);
  const history = useHistory();
  const handleFollow = (e) => {
    setfetchDataPending(true);
    if (authInfo && users) {
      fetch(
        `https://twitter-clone-69.herokuapp.com/profile/addfollow/${
          authInfo && authInfo.id
        }?_method=PUT`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(e),
        }
      ).then((res) => {
        if (res) {
          setfetchDataPending(false);
        }
      });
    }
  };
  return (
    <Flex color='brand.text' alignItems={'center'} pos='relative' py='3'>
      <Avatar
        cursor={'pointer'}
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
        {!fetchDataPending ? (
          users && authInfo && _.find(users.followers, { _id: authInfo.id }) ? (
            'Following'
          ) : (
            'Follow'
          )
        ) : (
          <Spinner />
        )}
      </Button>
    </Flex>
  );
}

export default FollowSuggestion;
