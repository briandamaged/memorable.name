
import React from 'react';

import { Box } from 'grommet';

import {
  JokeRendition,
} from '@memorable.name/types';

import Grommet from '../src/containers/Grommet';

import JokeRevealer from '../src/components/FullNameList/JokeRevealer';

export default {
  title: 'JokeRevealer',
};

export const quickExample = ()=> (
  <Grommet>
    <Box fill align="center" justify="center" >
      <Box width="medium" >
        <JokeRevealer name="Warren Peace" soundsLike="War and Peace" />
      </Box>
    </Box>
  </Grommet>
)

quickExample.story = {
  name: "Quick Example"
}
