
import Koa from 'koa';
import Router from 'koa-router';
import { ApolloServer, gql } from 'apollo-server-koa';

import Knex from 'knex';

import { GivenName, FullName, Surname } from './types';

import { createModels } from './models';

const app = new Koa();
const rtr = new Router();

const knex = Knex(require('../knexfile'));

const models = createModels(knex);


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
      return models.FullName.fetchAll();
    },

    async givenNames() {
      return models.GivenName.fetchAll();
    },
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
