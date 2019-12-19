
import React from 'react';

import Grommet from '../src/containers/Grommet';

import HomophoneForm from '../src/components/HomophoneForm';

export default {
  title: "HomophoneForm",
};

export const simple = ()=> {
  return (
    <Grommet>
      <HomophoneForm />
    </Grommet>
  )
}

simple.story = {
  name: "simple"
}
