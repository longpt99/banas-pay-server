import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
const AuthPage = lazy(() => import('../pages/Auth'));
// const HomePage = lazy(() => import('pages/Home'));
// const ProfilePage = lazy(() => import('pages/Profile'));

const Routes = () => {
  return (
    <React.Fragment>
      <Switch>
        <PublicRoute exact path="/login" component={AuthPage} />
        <PublicRoute exact path="/register" component={AuthPage} />
        {/* <PrivateRoute exact path="/profile" component={ProfilePage} /> */}
        <PrivateRoute exact path="/" component={<h1>Home Page</h1>} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
