
import REPL from 'repl';

import Knex from 'knex';
import config from './knexfile';

import {createModels} from './src/models';

const knex = Knex(config);

const models = createModels(knex);

const repl = REPL.start({
  prompt: "> ",
});

Object.assign(repl.context, {
  knex, models,
}, models);

repl.on('exit', async function() {
  console.log("--- Disconnecting from database...");
  await knex.destroy();
  console.log("--- Done");
});

