import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Center, Heading } from '@chakra-ui/layout';
import { BsCalendar3 } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import { Input } from '@chakra-ui/input';
import { Avatar } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { BsArrowLeft } from 'react-icons/bs';
import useFetch from '../../customHooks/useFetch';
import { useHistory } from 'react-router';
import useAuth from '../../customHooks/useAuth';
import SingleMsgfrom from './SingleMsgfrom';
import SingleMsgto from './SingleMsgto';
import Navbar from '../../Navbar/Navbar';
function PersonalMessage({ userInfo }) {
  const history = useHistory();
  const [messageInputSend, setMessageInputSend] = useState<null | string>();
  const messageInput = (e) => {
    setMessageInputSend(e.target.value);
  };
  const { authInfo } = useAuth();
  const sendMessage = () => {
    fetch(
      `https://twitter-clone-69.herokuapp.com/chat/${
        authInfo && authInfo.username
      }?_method=PUT`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userInfo && userInfo.username,
          message: messageInputSend,
        }),
      }
    ).then((res) => {
      return res.json();
    });
    console.log(messageInputSend);
  };

  return (
    <Box
      w={{ lg: 'container.lg' }}
      border='1px'
      h='full'
      borderColor={'whiteAlpha.300'}
      m='auto'
      overflowY={'hidden'}
      color='brand.text'>
      <Box py='3' bg='brand.bg' px='3' cursor='pointer'>
        <Box>
          <BsArrowLeft
            size={27}
            onClick={() => {
              history.push('/chat');
            }}
          />
        </Box>
      </Box>
      <Box mb='5' py={5} borderBottom={'1px'} borderColor={'whiteAlpha.100'}>
        <Center flexDir={'column'} py='2' maxW='96' m='auto'>
          <Avatar
            mb='3'
            src={userInfo && userInfo.profilePic}
            objectFit={'cover'}></Avatar>
          <Flex overflowWrap={'anywhere'} alignItems={'center'}>
            <Text fontSize={'lg'} fontWeight={'bold'}>
              {userInfo && userInfo.name}
            </Text>
            <Text pl='1' color='whiteAlpha.600'>
              @ {userInfo && userInfo.username}
            </Text>
          </Flex>
          <Text pt='2' textAlign='center' noOfLines={3}>
            {userInfo && userInfo.bio}
          </Text>
          <Flex pt='2'>
            <Flex>
              <Text color='whiteAlpha.600'>Following</Text>
              <Text pl='2'> {userInfo && userInfo.following.length}</Text>
            </Flex>
            <Flex>
              <Text pl='4' color='whiteAlpha.600'>
                Followers
              </Text>
              <Text pl='2'>{userInfo && userInfo.followers.length}</Text>
            </Flex>
          </Flex>
          <Flex pt='2' alignItems={'center'}>
            <BsCalendar3 />
            <Text color='whiteAlpha.600' pl='2'>
              Joined
            </Text>
            <Text pl='2'>
              {new Date(userInfo && userInfo.createdAt).toLocaleString(
                'default',
                {
                  month: 'long',
                }
              )}{' '}
              {new Date(userInfo && userInfo.createdAt).getFullYear()}
            </Text>
          </Flex>
        </Center>
      </Box>
      <Center>
        <Heading color='whiteAlpha.400' pt='40' textAlign={'center'}>
          Chat feature is currently not available!
        </Heading>
      </Center>
      {/* <Box overflow={'auto'} h='96'>
        {userInfo &&
          userInfo.messages.map((msg) => <SingleMsgfrom message={msg} />)}
      </Box> */}

      {/* <Box
        pos='fixed'
        pt='5'
        pb='5'
        px='2'
        w='inherit'
        bottom='0'
        borderTop='1px'
        borderColor='whiteAlpha.400'>
        <Flex alignItems={'center'}>
          <Input
            rounded={'full'}
            placeholder='Enter a message'
            w='full'
            onChange={messageInput}
            pr='20'
            h='10'></Input>
          <Button
            pos='absolute'
            right='2'
            bg='brand.main'
            color='brand.text'
            onClick={sendMessage}
            roundedRight={'full'}
            h='10'>
            Send
          </Button>
        </Flex>
      </Box> */}
    </Box>
  );
}

export default PersonalMessage;
