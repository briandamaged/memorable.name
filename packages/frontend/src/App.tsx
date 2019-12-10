import React from 'react';
import './App.css';

import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

const query = gql`
  {
    fullNames {
      givenNames {
        spellings
      }

      surnames {
        spellings
      }
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
        data.fullNames.map(({givenNames, surnames}: {givenNames: {spellings: string[]}[], surnames: {spellings: string[]}[] }) => (
          <li>{givenNames[0].spellings[0]} {surnames[0].spellings[0]}</li>
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
