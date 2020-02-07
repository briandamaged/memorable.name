
import React from 'react';

import {
  Grommet as BaseGrommet,
} from 'grommet';

import {
  grommet,
  base,
} from 'grommet/themes';

export const theme = grommet;

export const Grommet: React.FC = (props)=> (
  <BaseGrommet theme={theme} full {...props} />
);

export default Grommet;
