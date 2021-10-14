import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/layout';
import FollowSuggestion from './FollowSuggestion';
import useFetch from '../../customHooks/useFetch';
import useAuth from '../../customHooks/useAuth';
function WhoToFollow() {
  const [url, setUrl] = useState<string | null>();
  const [counter, setCounter] = useState<number>(0);
  const { authInfo } = useAuth();
  const [fetchData, setFetchData] = useState<any>();
  useEffect(() => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 500);
    fetch(`http://localhost:3001/followSuggestions`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setFetchData(result);
      });
  }, [counter]);
  const handleFollow = (e) => {
    if (authInfo && fetchData) {
      fetch(
        `http://localhost:3001/profile/addfollow/${
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
        // history.go(0);
        return res.json();
      });
    }
  };
  return (
    <Box bg='brand.bg' color='brand.text' pos='fixed' w='350px'>
      <Text py='5' fontSize={'2xl'} fontWeight={'bold'}>
        Who to follow
      </Text>
      <Box bg='#202929' rounded='2xl' px='5' py='3'>
        {fetchData &&
          fetchData.map(
            (users) =>
              users.username !== authInfo.username && (
                <FollowSuggestion
                  users={users}
                  handleFollow={handleFollow}
                  authInfo={authInfo}
                />
              )
          )}
      </Box>
    </Box>
  );
}

export default WhoToFollow;
