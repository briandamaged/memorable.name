
import React, {useState} from 'react';

import {
  Box,
  Button,
  Collapsible,
  Layer,
  Text,
} from 'grommet';

import {
  Dislike, Like,
} from 'grommet-icons';

import {
  Joke,
} from '@memorable.name/types';





export const HintRevealer:React.FC<{hint: string}> = ({hint})=> {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <Box align="center" >
      {
        (isRevealed)
          ? <Text>{hint}</Text>
          : <Button label="Show Hint" onClick={()=> setIsRevealed(true) } />
      }
    </Box>
  );
}



export const JokeRevealer: React.FC<Joke> = ({fullName, hints = [], soundsLike})=> {
  const [isRevealed, setRevealed] = useState(false);

  return (
    <Box
      width="medium"
      background="light-1"
      direction="column"
      elevation="medium"
      pad="small"
      margin="small"
    >
      <Box direction="row" align="center" >
        <Box fill={true} >
          <Text size="xlarge" >
            {fullName}
          </Text>
        </Box>

        <Button icon={<Dislike />} />
        <Button icon={<Like />} />
      </Box>

      <Box>
        <Text>{soundsLike}</Text>
      </Box>
    </Box>

  );
}



export default JokeRevealer;
