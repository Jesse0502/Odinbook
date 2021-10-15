import { Box, Grid, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useAuth from '../../customHooks/useAuth';
import PersonalMessage from './PersonalMessage';
function Messages(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState<string | null>();
  const [getFollowersUrl, setFollowersUrl] = useState();
  const [counter, setCounter] = useState<number>(1);
  const [userInfo, setUserInfo] = useState();
  const { authInfo } = useAuth();
  useEffect(() => {
    fetch(
      `https://twitter-clone-69.herokuapp.com/follower/profile/${props.match.params.id}`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setUserInfo(result.user[0]);
      })
      .catch((err) => {});
    setUrl(props.match.params.id);
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  }, [counter]);
  return (
    <Grid
      border='1px'
      templateColumns={{ md: '12fr', base: '12fr' }}
      bg='#1F2223'
      borderColor={'whiteAlpha.200'}
      pos='relative'
      minH='100vh'>
      {/* <Center display={{ base: 'none', md: 'inherit' }}> */}
      {/* <Navbar home={false} profile={false} messages={true} /> */}
      {/* </Center> */}
      <Box
        // border='1px'
        maxH='100vh'
        overflowY={'hidden'}
        // borderColor={'whiteAlpha.200'}
      >
        <PersonalMessage userInfo={userInfo && userInfo} />
      </Box>
    </Grid>
  );
}

export default Messages;
