
import path from 'path';
import REPL from 'repl';

import Knex from 'knex';

import {createModels} from './src/models';


const historyPath = path.resolve(__dirname, ".node_repl_history");
const knex = Knex(require('./knexfile'));
const models = createModels(knex);


const repl = REPL.start({
  prompt: "> ",
});

Object.assign(repl.context, {
  knex, models,
  repl,
}, models);

repl.on('exit', async function() {
  console.log("--- Disconnecting from database...");
  await knex.destroy();
  console.log("--- Done");
});



repl.setupHistory(historyPath, function(err) {
  // TODO: Maybe error handling of some kind?
});
