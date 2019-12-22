
import React, { ReactNode } from 'react';

import ApolloClient from 'apollo-boost';

import {
  ApolloProvider as BaseApolloProvider,
} from '@apollo/react-hooks';


export const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

export const ApolloProvider: React.FC<{children: ReactNode}> = (props)=> (
  <BaseApolloProvider client={client} {...props} />
)

export default ApolloProvider;
