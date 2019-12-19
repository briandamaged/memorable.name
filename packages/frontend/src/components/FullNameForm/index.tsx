
import React, {useState} from 'react';

import useForm from 'react-hook-form';

import {
  Form, TextInput, Button, TextArea, Box,
} from 'grommet';

import { AddCircle } from 'grommet-icons';



export const FullNameForm: React.FC = (props)=> {
  const [nextGivenNameID, setNextGivenNameID] = useState(1);
  const [givenNameIDs, setGivenNameIDs] = useState([0]);


  function addGivenName() {
    setGivenNameIDs(givenNameIDs.concat(nextGivenNameID));
    setNextGivenNameID(nextGivenNameID + 1);
  }

  function removeGivenName(id: number) {
    const index = givenNameIDs.indexOf(id);
    if(index >= 0) {
      setGivenNameIDs([
        ...(givenNameIDs.slice(0, index)),
        ...(givenNameIDs.slice(index + 1)),
      ]);
    }
  }

  const {
    register, handleSubmit,
  } = useForm();



  return (
    <Form onSubmit={handleSubmit((data)=> {console.log(data)})} >
      <Box
        background="light-1"
        border="all"
        gap="small"
        pad="small"
        elevation="medium"
      >

        <Box direction="row" wrap={true} border="all" pad="xsmall" >
          <Box width="small">
            <label htmlFor="soundsLike" >Sounds Like...</label>
          </Box>
          <Box align="stretch">
            <TextInput
              id="soundsLike"
              name="soundsLike"
              placeholder="Sounds Like..."
              ref={register}
            />
          </Box>
        </Box>


        <Box direction="row" wrap={true} border="all" pad="xsmall" >
          <Box width="small">
            <label htmlFor="givenNames" >Given Names</label>
          </Box>
          <Box align="stretch">
            <Box direction="column" gap="xsmall">
              {
                givenNameIDs.map((idx)=> (
                  <Box key={idx} direction="row">
                    <TextInput
                      id={`givenName[${idx}]`}
                      name={`givenName[${idx}]`}
                      placeholder="Given Name"
                      ref={register}
                    />

                    <Button type="button" primary label="Remove" onClick={ ()=> removeGivenName(idx) } />
                  </Box>

                ))
              }

              <Button
                type="button"
                primary
                label="Add Another"
                onClick={ addGivenName }
              />
            </Box>
          </Box>
        </Box>

        <Button type="submit" primary label="Submit" />
      </Box>
    </Form>
  );
}




export default FullNameForm;
