import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './RootContext';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(UserContext);

  return (
    <Route {...rest} render={props => (
      authenticated ? 
        <Component {...props} /> :
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
  )
};

export default AuthenticatedRoute;
