
import Koa from 'koa';
import Router from 'koa-router';
import { ApolloServer, gql } from 'apollo-server-koa';

const app = new Koa();
const rtr = new Router();


export interface NameEntry {
  first: string;
  middle?: string;
  last: string;
}

const names: NameEntry[] = [
  {
    first: "Warren",
    last: "Peace",
  },
  {
    first: "Helen",
    last: "Wheels",
  },
  {
    first: "Walten",
    middle: "D.",
    last: "Hale",
  },
];


const schema = gql `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: ()=> 'Howdy!',
  }
};

const gqlServer = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});


app.use(gqlServer.getMiddleware());



// rtr.get('/', function(ctx) {
//   ctx.body = "Navigate to /api/names for 'Memorable' names!";
// });

// rtr.get('/api/names', function(ctx) {
//   ctx.body = {
//     content: names,
//   };
// });

app.use(rtr.routes());

app.listen(3000, function() {
  console.log(`${gqlServer.graphqlPath}`);
});
