
import React from 'react';

import { FullName, GivenName, Surname } from '@memorable.name/types';

import Grommet from '../src/containers/Grommet';

import FullNameList from '../src/components/FullNameList';

export default {
  title: 'FullNameList',
};

const someNames: FullName[] = [
  {
    id: 1,
    givenNames: [{
      id: 1,
      spellings: ["Brian", "Bryan"],
      genders: ['m'],
    }],
    surnames: [{
      id: 1,
      spellings: ["St. John", "St. Jon"]
    }],
    genders: [],
  },
  {
    id: 2,
    givenNames: [{
      id: 1,
      spellings: ["John", "Jon"],
      genders: ['m'],
    }],
    surnames: [{
      id: 1,
      spellings: ["St. Brian", "St. Bryan"]
    }],
    genders: [],
  },
]

export const quickExample = ()=> (
  <Grommet>
    <FullNameList fullNames={someNames} />
  </Grommet>
)

quickExample.story = {
  name: "Quick Example"
}
