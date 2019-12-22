
import React, { useState } from 'react';

import {
  Box,
} from 'grommet';

export const HomophoneForm: React.FC = (props)=> {
  const [spellings, setSpellings] = useState([""]);

  const SpellingChangeHandler = (
    (index: number)=>
      function handleSpellingChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(index < spellings.length) {
          const newSpellings = spellings.slice(0);
          newSpellings[index] = e.target.value;

          if(index === newSpellings.length - 1) {
            newSpellings.push("");
          }
          setSpellings(newSpellings);
        }
      }
  );

  const SpellingBlurHandler = (
    (index: number)=>
      function handleSpellingBlur() {
        if(index < spellings.length - 1 && spellings[index] === '') {
          const newSpellings = spellings.slice(0);
          newSpellings.splice(index, 1);
          setSpellings(newSpellings);
        }
      }
  )


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(JSON.stringify(spellings.slice(0, spellings.length - 1), null, 2));
  }

  return (
    <form onSubmit={handleSubmit} >
      <Box
        direction="column"
        gap="small"
      >

        {
          spellings.map((sp, index)=> (
            <input
              type="text"
              name={`spelling[${index}]`}
              value={sp}
              onChange={SpellingChangeHandler(index)}
              onBlur={SpellingBlurHandler(index)}
            />
          ))
        }

        <input type="submit" value="Submit" />
      </Box>
    </form>
  );
}

export default HomophoneForm;
