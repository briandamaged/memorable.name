
import React from 'react';

import { List } from 'grommet';

import {FullName} from '@memorable.name/types';





export const FullNameList: React.FC<{fullNames: FullName[]}> = ({fullNames})=> (
  <List
    data={fullNames}
    primaryKey={(f)=> `${f.givenNames[0].spellings[0]} ${f.surnames[0].spellings[0]}`}
  />
);

export default FullNameList;
