import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
function useAuth() {
  interface authInfo {}
  const [authInfo, setAuthInfo] = useState<any>();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      let user = jwt.decode(token);
      if (user) {
        setAuthInfo(user);
        console.log(user);
      }
    }
  }, []);
  return { authInfo };
}

export default useAuth;
