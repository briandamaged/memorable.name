
import React from 'react';

import {
  Box,
} from 'grommet';

import {
  Joke,
} from '@memorable.name/types';

import Grommet from '../src/containers/Grommet';

import FullNameList from '../src/components/FullNameList';

export default {
  title: 'FullNameList',
};



const jokes: Joke[] = [
  {
    fullName: "Warren Peace",
    hints: [
      "Book title",
    ],
    soundsLike: "War and Peace",
  },
  {
    fullName: "Omar Gourd",
    hints: [
      "God",
    ],
    soundsLike: "Oh my God",
  },
  {
    fullName: "Window Payne",
    hints: [],
    soundsLike: "Window Pane",
  },
  {
    fullName: "Bjorne Tufail",
    hints: [
      "Born",
    ],
    soundsLike: "Born to Fail",
  },
  {
    fullName: "Anna Mills",
    hints: [],
    soundsLike: "Animals",
  }
];




export const quickExample = ()=> (
  <Grommet>
    <Box fill align="center" justify="center" >
      <FullNameList jokes={jokes} />
    </Box>
  </Grommet>
)

quickExample.story = {
  name: "Quick Example"
}
