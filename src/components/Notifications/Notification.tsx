import React from 'react';
import { Text, Flex } from '@chakra-ui/layout';
import useUserInfo from '../customHooks/useUserInfo';
import { Avatar } from '@chakra-ui/avatar';
import { BsDot } from 'react-icons/bs';
function Notification({ notification }) {
  const { userInfo } = useUserInfo(notification.message);
  return (
    <Flex
      bg='brand.subText'
      color={'brand.text'}
      py='5'
      pl='3'
      borderBottom={'1px'}
      borderColor={'whiteAlpha.400'}>
      <Flex>
        <Avatar src={userInfo && userInfo.profilePic}></Avatar>
        <Flex flexDir={'column'}>
          <Flex>
            <Text pl='3' fontFamily={'sans-serif'}>
              {userInfo && userInfo.name}
            </Text>
            <BsDot color='#4B4E4F' size={25} />
            <Text color='whiteAlpha.600'>@{userInfo && userInfo.username}</Text>
          </Flex>
          <Text color='whiteAlpha.600' pl='3'>
            🎉 {userInfo && userInfo.name} is now following you!
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Notification;
