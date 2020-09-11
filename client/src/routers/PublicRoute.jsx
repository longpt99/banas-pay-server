import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, ...rest }) => {
  // const token = useSelector((state) => state.token.accessToken);
  const token = null;
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
