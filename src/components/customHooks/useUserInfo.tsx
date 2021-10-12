import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useFetch from './useFetch';

function useUserInfo(username) {
  const [userInfo, setLoggedUserInfo] = useState<any>();
  const [url, setUrl] = useState<string | null>();
  const [fetchData, setFetchData] = useState<any | null>(null);
  useEffect(() => {
    if (username) {
      fetch(`http://localhost:3001/profile/${username}`)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setFetchData(result);
        })
        .catch((err) => {});
    }
  }, [username]);
  useEffect(() => {
    if (fetchData) {
      setLoggedUserInfo(fetchData.user[0]);
    }
  });
  return { userInfo };
}

export default useUserInfo;
