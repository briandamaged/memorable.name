
import React, {useState} from 'react';

import {
  Box,
  Button,
  Collapsible,
} from 'grommet';

import {
  JokeRendition,
} from '@memorable.name/types';



export const JokeRevealer: React.FC<{name: string, soundsLike: string}> = ({name, soundsLike})=> {
  const [isRevealed, setRevealed] = useState(false);
  return (
    <Box
      background="light-1"
      direction="column"
      elevation="medium"
      pad="small"
    >
      <Box direction="row">
        <Box fill={true} >
          {name}
        </Box>
        <Box>
          <Button
            label={ isRevealed ? "Hide" : "Reveal" }
            onClick={()=> setRevealed(!isRevealed)}
          />
        </Box>
      </Box>
      <Collapsible direction="vertical" open={isRevealed} >
        <Box>
          {soundsLike}
        </Box>
      </Collapsible>
    </Box>

  );
}



export default JokeRevealer;
