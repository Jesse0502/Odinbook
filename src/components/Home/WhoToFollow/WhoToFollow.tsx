import React, { useEffect, useState } from 'react';
import { Box, Center, Text } from '@chakra-ui/layout';
import FollowSuggestion from './FollowSuggestion';
import useFetch from '../../customHooks/useFetch';
import useAuth from '../../customHooks/useAuth';
import { Spinner } from '@chakra-ui/spinner';
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

  return (
    <Box bg='brand.bg' color='brand.text' w='350px' pos='fixed'>
      <Text py='5' fontSize={'2xl'} fontWeight={'bold'}>
        Who to follow
      </Text>
      <Box bg='#202929' rounded='2xl' px='5' py='3'>
        {fetchData ? (
          fetchData.map(
            (users) =>
              users.username !== authInfo.username && (
                <FollowSuggestion users={users} authInfo={authInfo} />
              )
          )
        ) : (
          <Center>
            <Spinner size='lg' thickness='3px' color='brand.main' />
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default WhoToFollow;
