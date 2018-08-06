import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { VALID_TOKEN } from '../../constants';

const DASHBOARD_ROUTE = '/dashboard';
const LOGIN_ROUTE = '/login';

// Check to see if user is authenticated
export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.authToken === VALID_TOKEN;
};

// Creating a wrapper for private and public routes
export const AuthRoute = ({ component, ...props }) => {
  const { isPrivate } = props;
  if (isAuthenticated()) {
    if (isPrivate) {
      return <Route {...props} component={component} />;
    }
    return <Redirect to={DASHBOARD_ROUTE} />;
  }
  // Locks unauthenticated users out of the dashboard
  return isPrivate ? <Redirect to={LOGIN_ROUTE} /> : <Route {...props} component={component} />;
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

export default AuthRoute;
