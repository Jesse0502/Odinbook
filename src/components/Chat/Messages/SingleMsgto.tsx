import React from 'react';
import useUserInfo from '../../customHooks/useUserInfo';
import { Box, Text, Flex, Center } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
function SingleMsgto({ message }) {
  const { userInfo } = useUserInfo(message && message.to);
  return (
    <Flex py='3' pl='3'>
      <Avatar src={userInfo && userInfo.profilePic}></Avatar>
      <Flex flexDir='column'>
        <Flex>
          <Text pl='2'>{userInfo && userInfo.name}</Text>
          <Text pl='2' color='whiteAlpha.400'>
            @{userInfo && userInfo.username}
          </Text>
        </Flex>
        <Text pl='2' pt='1'>
          {message && message.messages.message}
        </Text>
      </Flex>
    </Flex>
  );
}

export default SingleMsgto;
