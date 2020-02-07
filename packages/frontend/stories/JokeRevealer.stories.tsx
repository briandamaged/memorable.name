
import React from 'react';

import { Box } from 'grommet';

import {
  Joke,
} from '@memorable.name/types';

import Grommet from '../src/containers/Grommet';

import JokeRevealer from '../src/components/FullNameList/JokeRevealer';

export default {
  title: 'JokeRevealer',
};


const joke: Joke = {
  fullName: "Warren Peace",
  hints: [
    "Book Title",
  ],
  soundsLike: "War and Peace",
};


export const quickExample = ()=> (
  <Grommet>
    <Box fill align="center" justify="center" >
      <Box width="medium" >
        <JokeRevealer {...joke} />
      </Box>
    </Box>
  </Grommet>
)

quickExample.story = {
  name: "Quick Example"
}
