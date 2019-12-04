import React from 'react';
import './App.css';

import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

const query = gql`
  {
    names {
      first
      last
    }
  }
`;


const NamesList: React.FC = ()=> {
  const { data, loading, error } = useQuery(query);

  if(loading) {
    return <div>Loading...</div>;
  };

  if(error) {
    return <div>Error!</div>;
  }

  return (
    <ul>
      {
        data.names.map(({first, last}: {first: string, last: string}) => (
          <li>{first} {last}</li>
        ))
      }
    </ul>
  );
}

const App: React.FC = () => {
  return (
    <ApolloProvider client={client} >
      <NamesList />
    </ApolloProvider>
  );
}

export default App;
