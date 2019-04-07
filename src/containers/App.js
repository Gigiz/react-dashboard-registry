import React, { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from 'react-apollo-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import HomePage from './HomePage';
import OtherPage from './OtherPage';
import LoginPage from './LoginPage';
import RegistryPage from './RegistryPage';
import UploadPage from './UploadPage';
import Header from '../components/Header';
import MessageBox from '../components/Message';
import UserContextProvider from '../components/RootContext';
import AuthenticatedRoute from '../components/AuthenticatedRoute';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(createUploadLink({ uri: 'http://localhost:4000/graphql' }))
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions,
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <UserContextProvider>
          <>
            <Header />
            <MessageBox />
            <Route exact path="/" component={HomePage} />
            <Route path="/other" component={OtherPage} />
            <Route path="/login" component={LoginPage} />
            <AuthenticatedRoute path="/registry" component={RegistryPage} />
            <AuthenticatedRoute path="/upload" component={UploadPage} />
          </>
        </UserContextProvider>
      </Suspense>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;