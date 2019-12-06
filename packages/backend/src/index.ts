
import Koa from 'koa';
import Router from 'koa-router';
import { ApolloServer, gql } from 'apollo-server-koa';

import Knex from 'knex';

import { GivenName, FullName, Surname } from './types';

const app = new Koa();
const rtr = new Router();

const knex = Knex(require('../knexfile'));


async function getGivenNames({id}: {id?: number | number[]} = {}) {
  let query = knex.select().from('given_names_spellings');
  if(typeof(id) === 'number') {
    query = query.where('given_name_id', id);
  } else if(Array.isArray(id)) {
    query = query.whereIn('given_name_id', id);
  }

  const gns = await query;
  const groupings: Record<number, GivenName> = {};
  for(const {given_name_id, spelling} of gns) {
    const givenName = groupings[given_name_id] = (groupings[given_name_id] || {id: given_name_id, spellings: []});
    givenName.spellings.push(spelling);
  }

  return Object.values(groupings);
}


async function getSurnames({id}: {id?: number | number[]} = {}) {
  let query = knex.select().from('surnames_spellings');
  if(typeof(id) === 'number') {
    query = query.where('surname_id', id);
  } else if(Array.isArray(id)) {
    query = query.whereIn('surname_id', id);
  }

  const sns = await query;
  const groupings: Record<number, Surname> = {};
  for(const {surname_id, spelling} of sns) {
    const surname = groupings[surname_id] = (groupings[surname_id] || {id: surname_id, spellings: []});
    surname.spellings.push(spelling);
  }

  return Object.values(groupings);
}


interface ExtendedFullName extends FullName {
  [key: string]: any
}

async function getFullNames() {
  let givenNamesQuery = knex.select().from('full_names_given_names').orderBy('ordering', 'asc');
  let surnamesQuery = knex.select().from('full_names_surnames').orderBy('ordering', 'asc');

  const [fngns, fnsns] = await Promise.all([
    givenNamesQuery, surnamesQuery,
  ]);
  
  const groupings: Record<number, ExtendedFullName> = {};

  for(const {full_name_id, given_name_id} of fngns) {
    const fullName = groupings[full_name_id] = (groupings[full_name_id] || {
      id: full_name_id,
      given_name_ids: [],
      givenNames: [],
      surname_ids: [],
      surnames: []
    });

    fullName.given_name_ids.push(given_name_id);
  }


  for(const {full_name_id, surname_id} of fnsns) {
    const fullName = groupings[full_name_id] = (groupings[full_name_id] || {
      id: full_name_id,
      given_name_ids: [],
      givenNames: [],
      surname_ids: [],
      surnames: []
    });

    fullName.surname_ids.push(surname_id);
  }

  return Object.values(groupings);
}


const schema = gql `
  type Query {
    fullNames: [FullName!]!
    givenNames: [GivenName!]!
  }

  type FullName {
    givenNames: [GivenName!]!
    surnames: [Surname!]!
  }

  type GivenName {
    id: ID
    spellings: [String!]!
  }

  type Surname {
    spellings: [String!]!
  }
`;

const resolvers = {
  Query: {
    async fullNames(/* parent, args, context, info */) {
      return getFullNames();
    },

    async givenNames() {
      return getGivenNames();
    },
  },

  FullName: {
    async givenNames(parent: ExtendedFullName) {
      const givenNames = await getGivenNames({id: parent.given_name_ids});
      return givenNames;
    },

    async surnames(parent: ExtendedFullName) {
      const surnames = await getSurnames({id: parent.surname_ids});
      return surnames;
    },
  },

  GivenName: {

  },

  Surname: {

  },
};

const gqlServer = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});


app.use(gqlServer.getMiddleware());




app.use(rtr.routes());

app.listen(3000, function() {
  console.log(`${gqlServer.graphqlPath}`);
});
