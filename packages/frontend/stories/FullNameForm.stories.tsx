
import React from 'react';

import {Box} from 'grommet';

import Grommet from '../src/containers/Grommet';

import FullNameForm from '../src/components/FullNameForm';


export default {
  title: "FullNameForm",
};

export const basic = ()=> (
  <Grommet >
    <Box align="center" pad="large" >
      <FullNameForm />
    </Box>
  </Grommet>
);

