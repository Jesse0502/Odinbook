import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useUserInfo from '../../customHooks/useUserInfo';
import { useHistory } from 'react-router';
import useAuth from '../../customHooks/useAuth';
function SingleComment({ comment, tweetId }) {
  const history = useHistory();
  const { userInfo } = useUserInfo(comment && comment.username);
  const { authInfo } = useAuth();
  const handleCommentDelete = () => {
    if (tweetId && comment) {
      fetch(
        `https://twitter-clone-69.herokuapp.com/tweet/comment/${
          tweetId && tweetId
        }?_method=DELETE`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: comment && comment.username,
            createdAt: comment && comment.createdAt,
            tweet: comment && comment.tweet,
          }),
        }
      ).then((res) => {
        return res.json();
      });
    }
  };

  return (
    <Box
      py='6'
      mx={{ lg: '5', base: '3' }}
      borderTop='1px'
      borderBottom='1px'
      borderColor='whiteAlpha.200'>
      <Flex pos='relative'>
        <Avatar
          cursor='pointer'
          onClick={() => {
            history.push(`/${comment.username}`);
          }}
          src={userInfo && userInfo.profilePic}
          size='md'></Avatar>
        <Box pl='4'>
          <Flex>
            <Text>{userInfo && userInfo.name}</Text>
            <Text color='whiteAlpha.400' pl='2'>
              @{userInfo && userInfo.username}
            </Text>
          </Flex>
          <Flex pos='absolute' right='0' top='0' alignItems={'center'}>
            {authInfo && comment && authInfo.username === comment.username && (
              <Button
                variant='link'
                py='0'
                pr='4'
                _focus={{ shadow: 'none', outline: 'none' }}
                outline={'0px'}
                color='crimson'
                onClick={handleCommentDelete}>
                Delete
              </Button>
            )}
            <Text
              textAlign={'right'}
              color='whiteAlpha.400'
              display={{ base: 'none', lg: 'block' }}>
              {comment &&
                comment.createdAt &&
                formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
            </Text>
          </Flex>
          <Text pt='1' w={{ lg: '500px', base: '96' }}>
            {comment.tweet}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default SingleComment;
