
import React, {useContext} from 'react';

import {
  Box,
  Grid,
  ResponsiveContext,
} from 'grommet';

import {
  Joke,
} from '@memorable.name/types';

import JokeRevealer from './JokeRevealer';


function columnsFor(size: string): string[] {
  switch(size) {
    case "medium":
      return ["medium", "medium"];
    default:
      return ["medium"];
  }
}

export const FullNameList2: React.FC<{jokes: Joke[]}> = ({jokes})=> {
  const size = useContext(ResponsiveContext);



  return (
    <Grid
      columns={columnsFor(size)}
      gap="small"
    >
      { 
        jokes.map((joke, index)=> (
          <JokeRevealer key={index} {...joke} />
        ))
      }

      {size}
    </Grid>
  );

};


export default FullNameList2;
