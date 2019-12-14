import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import { FullName } from '@memorable.name/types';


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

interface FullNameResults {
  fullNames: FullName[];
}


const NamesList: React.FC = ()=> {
  const { data, loading, error } = useQuery<FullNameResults>(query);

  if(loading) {
    return <div>Loading...</div>;
  }
  
  if(error) {
    return <div>Error!</div>;
  }

  return (
    <ul>
      {
        data!.fullNames.map(({givenNames, surnames}) => (
          <li>{givenNames[0].spellings[0]} {surnames[0].spellings[0]}</li>
        ))
      }
    </ul>
  );

}

const App: React.FC = () => {
  return (
    <ApolloProvider client={client} >
      <Router>
        <Switch>
          <Route path="/foo" >
            FOO!
          </Route>
          <Route path="/" >
            <NamesList />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
