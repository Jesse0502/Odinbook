import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useFetch from './useFetch';

function useUserInfo(username) {
  const [userInfo, setLoggedUserInfo] = useState<any>();
  const [url, setUrl] = useState<string | null>();
  const [counter, setCounter] = useState(0);
  const [fetchData, setFetchData] = useState<any | null>(null);
  useEffect(() => {
    if (username) {
      fetch(`https://twitter-clone-69.herokuapp.com/profile/${username}`)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setFetchData(result);
          setTimeout(() => {
            setCounter(counter + 1);
          }, 100);
        })
        .catch((err) => {});
    }
  }, [username, counter]);
  useEffect(() => {
    if (fetchData) {
      setLoggedUserInfo(fetchData.user[0]);
    }
  });
  return { userInfo };
}

export default useUserInfo;
