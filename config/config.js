'use strict';

import _ from 'lodash';
import chalk from 'chalk';
import allEnv from './env/all';

if (!process.env.NODE_ENV) {
  console.error(chalk.red('NODE_ENV is not defined! Using default development environment'));
  process.env.NODE_ENV = 'development';
}

const extendEnv = require('./env/' + process.env.NODE_ENV) || {};

export default _.extend(
  allEnv,
  extendEnv
);