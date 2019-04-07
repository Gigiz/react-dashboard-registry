import React, { createContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

export const UserContext = createContext();

const CURRENT_USER = gql`
  query {
    me {
      username
    }
  }
`;

const UserContextProvider = ({ children }) => {
  const { data, error } = useQuery(CURRENT_USER, { suspend: true });

  let authenticated = false;
  let username = '';
  if (!error && data && data.me && data.me.username) {
    authenticated = true;
    username = data.me.username;
  }

  const defaultContext = {
    authenticated,
    username,
  };

  return (
    <UserContext.Provider value={defaultContext}>
      {children}
    </UserContext.Provider>
  )
};

export default UserContextProvider;