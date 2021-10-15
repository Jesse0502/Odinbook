import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Center } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { useHistory } from 'react-router';
function ChatsAvailable({ follow }) {
  const [counter, setCounter] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<any>();
  //   const { authInfo } = useAuth();
  useEffect(() => {
    fetch(
      `https://twitter-clone-69.herokuapp.com/follower/profile/${
        follow && follow._id
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setUserInfo(result.user[0]);
      })
      .catch((err) => {});
    // setUrl(props.match.params.id);
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  }, [counter]);
  const history = useHistory();
  return (
    <Flex
      onClick={() => {
        history.push(`/chat/${userInfo._id}`);
      }}
      _hover={{ bg: '#212A2A', cursor: 'pointer' }}
      py='5'
      pos='relative'
      borderBottom={'1px'}
      borderColor={'whiteAlpha.400'}
      pl='3'>
      <Box>
        <Avatar src={userInfo && userInfo.profilePic}></Avatar>
      </Box>
      <Flex flexDir={'column'}>
        <Flex pl='3' alignItems={'center'}>
          <Text fontSize={'lg'}>{userInfo && userInfo.name}</Text>
          <Text pl='2' color='whiteAlpha.400'>
            @{userInfo && userInfo.username}
          </Text>
        </Flex>
        <Text pl='3' noOfLines={1}>
          {userInfo && userInfo.bio}
        </Text>
      </Flex>
    </Flex>
  );
}

export default ChatsAvailable;
