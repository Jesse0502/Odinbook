import React, { useEffect, useState } from 'react';
import { Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { Image } from '@chakra-ui/image';
import useFetch from '../customHooks/useFetch';
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Button,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
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
import useAuth from '../customHooks/useAuth';
function FollowOrFollower({ info, onClose }) {
  const [url, setUrl] = useState<any>(null);
  useEffect(() => {
    setUrl(`/follower/profile/${info && info._id}`);
  }, []);
  const { authInfo } = useAuth();
  const { fetchData } = useFetch(url, 'GET', '');
  const history = useHistory();
  const handleFollow = () => {
    if (authInfo && fetchData.user[0]) {
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
          body: JSON.stringify(fetchData.user[0]),
        }
      ).then((res) => {
        window.location.reload();
        return res.json();
      });
    }
  };
  return (
    <Flex
      alignItems='center'
      py='3'
      borderBottom={'1px'}
      borderColor={'whiteAlpha.300'}>
      <Avatar
        cursor={'pointer'}
        onClick={() => {
          history.push(`/${fetchData && fetchData.user[0].username}`);
          onClose();
        }}
        src={fetchData && fetchData.user[0].profilePic}></Avatar>
      <SkeletonText w='70%' pl='4' isLoaded={fetchData}>
        <Box>
          <Heading fontSize={'lg'}>
            {fetchData && fetchData.user[0].name}
          </Heading>
          <Text color='whiteAlpha.500'>
            @{fetchData && fetchData.user[0].username}
          </Text>
        </Box>
      </SkeletonText>
      <Menu>
        <MenuButton
          as={Button}
          bg='brand.bg'
          _expanded={{ bg: 'brand.bg' }}
          _focus={{ boxShadow: 'outline' }}
          color='brand.text'
          _hover={{ bg: 'brand.bg' }}>
          {' '}
          &#x2022; &#x2022; &#x2022;
        </MenuButton>
        <MenuList bg='brand.bg' color='brand.text'>
          <MenuItem py='-5px'></MenuItem>
          {fetchData &&
            authInfo &&
            fetchData.user[0].username !== authInfo.username && (
              <MenuItem
                bg='brand.bg'
                color='brand.text'
                _hover={{ bg: 'brand.bg' }}
                onClick={handleFollow}>
                Unfollow
              </MenuItem>
            )}

          <MenuItem
            bg='brand.bg'
            color='brand.text'
            _hover={{ bg: 'brand.bg' }}
            onClick={() => {
              history.push(`/${fetchData && fetchData.user[0].username}`);
              onClose();
            }}>
            Profile
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default FollowOrFollower;
