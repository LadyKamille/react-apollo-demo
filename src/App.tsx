import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import React from 'react';
import './App.css';
import createClient from './apolloClient';
import Repositories from './Repositories';

const client = createClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Repositories/>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
