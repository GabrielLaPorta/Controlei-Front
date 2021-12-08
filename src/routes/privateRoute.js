import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from './token';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isLogged() ?
        <Component {...props} />
        : <Redirect to="/entrar" />
    )} />
  );
};

export default PrivateRoute;
