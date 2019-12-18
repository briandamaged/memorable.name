import React, { useState } from 'react';

import {
  Box,
  Button, 
  Heading, 
  Collapsible, 
  ResponsiveContext,
  Layer,
} from 'grommet';

import {
  Menu,
  FormClose,
} from 'grommet-icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import { FullName } from '@memorable.name/types';
import Grommet from './containers/Grommet';

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



const NavBar: React.FC = (props)=> (
  <Box
    as="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{
      left: 'medium',
      right: 'small',
      vertical: 'small',
    }}
    elevation="medium"
    {...props}
  />
)


const App: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ApolloProvider client={client} >
      <Grommet>
        <ResponsiveContext.Consumer >
          {(size)=> (

            <Box fill>
              <NavBar>
                <Heading level="3" margin='none' >memorable.name</Heading>
                <Button icon={ <Menu /> } onClick={ ()=> { setExpanded(!expanded) } } />
              </NavBar>


              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                <Box flex align='center' justify='center'>

                  <Router>
                    <Switch>
                      <Route path="/" >
                        <NamesList />
                        <p>{size}</p>
                      </Route>
                    </Switch>
                  </Router>

                </Box>
                { (!expanded || size !== 'small') ? (
                  <Collapsible direction="horizontal" open={expanded} >
                    <Box
                      flex
                      width="medium"
                      background='light-2'
                      elevation='small'
                      align='center'
                      justify='center'
                    >
                      Sidebar
                    </Box>
                  </Collapsible>
                ) : (
                  <Layer>

                    <Box
                      background='light-1'
                      as='header'
                      justify='end'
                      align='center'
                      direction='row'
                    >
                      <Button icon={ <FormClose /> } onClick={()=> { setExpanded(!expanded) }} />
                    </Box>

                    <Box
                      fill
                      background='light-2'
                      align='center'
                      justify='center'
                    >
                      Responsive Sidebar
                    </Box>
                  </Layer>
                )}
              </Box>
            </Box>
          )}

        </ResponsiveContext.Consumer>
      </Grommet>
    </ApolloProvider>
  );
}

export default App;
