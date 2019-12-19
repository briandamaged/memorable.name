
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

  const RemoveSpellingHandler = (
    (index: number)=>
      function handleRemoveSpelling() {
        if(index < spellings.length) {
          const newSpellings = spellings.slice(0);
          newSpellings.splice(index, 1);
          setSpellings(newSpellings);
        }
      }
  )


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(JSON.stringify(spellings, null, 2));
  }

  return (
    <form onSubmit={handleSubmit} >
      <Box
        direction="column"
        gap="small"
      >

        {
          spellings.map((sp, index)=> (
            <Box direction="row" >
              <input
                type="text"
                name={`spelling[${index}]`}
                value={sp}
                onChange={SpellingChangeHandler(index)}
              />

              <button type="button" onClick={RemoveSpellingHandler(index)} >Remove</button>
            </Box>
          ))
        }

        <input type="submit" value="Submit" />
      </Box>
    </form>
  );
}

export default HomophoneForm;
