
import React from 'react';

import {
  Grommet as BaseGrommet,
} from 'grommet';

export const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};


export const Grommet: React.FC = (props)=> (
  <BaseGrommet theme={theme} full {...props} />
);

export default Grommet;
