
import * as Knex from "knex";

const tableNames = [
  'full_names_surnames', 'full_names_given_names', 'full_names',
  'surnames_spellings', 'surnames',
  'given_names_spellings', 'given_names',
];



export async function seed(knex: Knex): Promise<any> {
  for(const tableName of tableNames) {
    await knex(tableName).del();
  }

  async function createGivenName(spellings: string[]) {
    const [given_name_id] = await knex('given_names').insert({}, "id");
    await knex("given_names_spellings").insert(spellings.map((spelling)=> ({
      given_name_id, spelling,
    })));
  
    return given_name_id;
  }

  async function createSurname(spellings: string[]) {
    const [surname_id] = await knex('surnames').insert({}, "id");
    await knex("surnames_spellings").insert(spellings.map((spelling)=> ({
      surname_id, spelling,
    })));
    return surname_id;
  }

  async function createFullname({givenNameIDs, surnameIDs}: {givenNameIDs: number[], surnameIDs: number[]}) {
    const [full_name_id] = await knex('full_names').insert({}, 'id');


    await knex('full_names_given_names').insert(givenNameIDs.map((given_name_id, index)=> ({
      full_name_id, given_name_id, ordering: index,
    })));

    await knex('full_names_surnames').insert(surnameIDs.map((surname_id, index)=> ({
      full_name_id, surname_id, ordering: index,
    })));
  }


  const brian_id = await createGivenName(["Brian", "Bryan"]);
  const john_id = await createGivenName(["John", "Jon"]);
  const smith_id = await createSurname(["Smith", "Smithe"]);
  const johnson_id = await createSurname(["Johnson"]);


  await createFullname({
    givenNameIDs: [brian_id],
    surnameIDs: [smith_id],
  });

  await createFullname({
    givenNameIDs: [john_id],
    surnameIDs: [smith_id],
  });

  await createFullname({
    givenNameIDs: [brian_id],
    surnameIDs: [smith_id, johnson_id],
  });

};


