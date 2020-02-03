
import React from 'react';

import {
  FullName, GivenName, Surname,
  FullNameRendition, GivenNameRendition, SurnameRendition,
} from '@memorable.name/types';

import Grommet from '../src/containers/Grommet';

import FullNameList from '../src/components/FullNameList';

export default {
  title: 'FullNameList',
};


const someNames: FullNameRendition[] = [
  new FullNameRendition({
    givenNameRenditions: [
      new GivenNameRendition({
        spelling: "Warren",
        gender: "m",
      }),
    ],
    surnameRenditions: [
      new SurnameRendition({
        spelling: "Peace",
      })
    ],
  }),
];

export const quickExample = ()=> (
  <Grommet>
    <FullNameList fullNameRenditions={someNames} />
  </Grommet>
)

quickExample.story = {
  name: "Quick Example"
}
