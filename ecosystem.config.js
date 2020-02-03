
const path = require('path');

const BABEL_NODE = path.resolve(__dirname, "node_modules/.bin/babel-node");

module.exports = {
  apps : [
    {
      name: 'backend',
      interpreter: BABEL_NODE,
      interpreter_args: ["--extensions=.js,.ts"],
      cwd: './packages/backend',
      script: './src',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
    },
    {
      name: 'frontend',
      cwd: './packages/frontend',
      script: 'npm',
      args: ['run', '--', 'start'],

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'storybook',
      cwd: './packages/frontend',
      script: 'npm',
      args: ['run', '--', 'storybook'],

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'types',
      cwd: './packages/types',
      script: 'npm',
      args: ['run', '--', 'watch:typescript'],

      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      ignore_watch: [
        "node_modules",
        "lib",
      ]
    },
    {
      name: 'types',
      cwd: './packages/types',
      script: 'npm',
      args: ['run', '--', 'watch:babel'],

      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      ignore_watch: [
        "node_modules",
        "lib",
      ]
    },
  ],
};
