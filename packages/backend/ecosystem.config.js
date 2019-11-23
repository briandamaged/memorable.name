
const path = require('path');

const INTERPRETER_PATH = path.resolve(__dirname, "node_modules/.bin/babel-node");

module.exports = {
  apps : [{
    name: 'backend',
    interpreter: INTERPRETER_PATH,
    interpreter_args: ["--extensions=.js,.ts"],
    script: './src',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }],
};
