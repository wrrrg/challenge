import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { VALID_TOKEN } from '../../constants';

const { ADMIN_EMAIL } = process.env;
const DASHBOARD_ROUTE = '/dashboard';
const LOGIN_ROUTE = '/login';
const ADMIN_ROUTE = '/admin';

// Check to see if user is authenticated
export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.authToken === VALID_TOKEN;
};

export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user.email === ADMIN_EMAIL;
};

// Creating a wrapper for private and public routes
export const AuthRoute = ({ component, ...props }) => {
  const { isPrivate } = props;
  if (isAuthenticated()) {
    if (isPrivate) {
      return <Route {...props} component={component} />;
    }
    return <Redirect to={isAdmin() ? ADMIN_ROUTE : DASHBOARD_ROUTE} />;
  }
  // Locks unauthenticated users out of the dashboard
  return isPrivate ? <Redirect to={LOGIN_ROUTE} /> : <Route {...props} component={component} />;
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

export default AuthRoute;
