
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
    async fullNames(parent: unknown, args: unknown, context: GQLContext) {
      return context.models.FullName.fetchAll();
    },

    async givenNames(parent: unknown, args: unknown, context: GQLContext) {
      return context.models.GivenName.fetchAll();
    },
  },
};


interface GQLContext {
  models: typeof models;
}

const gqlServer = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: {
    models,
  },
});


app.use(gqlServer.getMiddleware());




app.use(rtr.routes());

app.listen(5000, function() {
  console.log(`${gqlServer.graphqlPath}`);
});
