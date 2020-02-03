
import React from 'react';

import { List, Box } from 'grommet';

import {
  FullName,
  FullNameRendition,
} from '@memorable.name/types';



export const FullNameEntry: React.FC<{fullNameRendition: FullNameRendition}> = ({fullNameRendition})=> (
  <Box>
    {fullNameRendition.render()}
  </Box>
)



export const FullNameList: React.FC<{fullNameRenditions: FullNameRendition[]}> = ({fullNameRenditions})=> (
  <Box direction="column" >
    { 
      fullNameRenditions.map((fnr, index)=> (
        <FullNameEntry key={index} fullNameRendition={fnr} />
      ))
    }
  </Box>
);

export default FullNameList;
