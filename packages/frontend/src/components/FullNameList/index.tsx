
import React from 'react';

import {FullName} from '@memorable.name/types';

export const FullNameList: React.FC<{fullNames: FullName[]}> = ({fullNames})=> (
  <ul>
    { fullNames.map((f)=> (
      <li>{f.givenNames[0].spellings[0]} {f.surnames[0].spellings[0]}</li>
    ))}
  </ul>
);

export default FullNameList;
