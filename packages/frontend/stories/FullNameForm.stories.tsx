
import React from 'react';

import {Box} from 'grommet';

import Grommet, {theme} from '../src/containers/Grommet';

import FullNameForm from '../src/components/FullNameForm';


export default {
  title: "FullNameForm",
};

export const basic = ()=> (
  <Grommet >
    <Box align="center" pad="large" >
      <FullNameForm />
    </Box>
    <code><pre>{JSON.stringify(theme, null, 2)}</pre></code>
  </Grommet>
);

