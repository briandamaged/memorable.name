
import React from 'react';

import { action } from '@storybook/addon-actions';

import { FullName, GivenName, Surname } from '@memorable.name/types';

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
]

export const quickExample = ()=> (
  <FullNameList fullNames={someNames} />
)

quickExample.story = {
  name: "Quick Example"
}
