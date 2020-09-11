import React, { useState, useEffect } from 'react';
import { Login, Register } from '../components';
import { useRouteMatch } from 'react-router-dom';

function Auth(props) {
  const { url } = useRouteMatch();
  const [loginUrl, setLoginUrl] = useState(true);

  useEffect(() => {
    if (url.includes('login')) {
      setLoginUrl(true);
    } else {
      setLoginUrl(false);
    }
  }, [url]);
  return <>{loginUrl ? <Login /> : <Register />}</>;
}

export default Auth;
