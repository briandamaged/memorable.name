
import React, {useState} from 'react';

import {
  Form, FormField, TextInput, Button, TextArea,
} from 'grommet';

const UseValueTo = (
  (setter: (input: string)=> void)=>
    (e: {target: {value: string}})=>
      setter(e.target.value)
)

export const FullNameForm: React.FC = (props)=> {
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(givenName);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        name="givenName"
        label="Given Name"
      >
        <TextInput
          id="givenName"
          placeholder="Given Name"
          value={givenName}
          onChange={UseValueTo(setGivenName)}
        />
      </FormField>

      <TextInput
          id="givenName"
          placeholder="Given Name"
          value={givenName}
          onChange={UseValueTo(setGivenName)}
        />

      <FormField
        name="surname"
        label="Surname"
      >
        <TextInput
          id="surname"
          placeholder="Surname"
          value={surname}
          onChange={UseValueTo(setSurname)}
        />
      </FormField>
  
      <Button type="submit" primary label="Submit" />
    </Form>
  );
}




export default FullNameForm;
