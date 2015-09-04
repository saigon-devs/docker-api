'use strict';

import Hapi from 'hapi';
import Swagger from 'hapi-swagger';
import Inert from 'inert';
import Vision from 'vision';
import path from 'path';
import chalk from 'chalk';
import _ from 'lodash';
import config from './config/config';
import pack from './package.json';
import FileFinder from './src/utils/file-finder';
import SwaggerPlugin from './src/plugins/swagger';
import JwtAuthPlugin from './src/plugins/jwt';

/**
 * Init server
 * @type {internals.Server|*|Server}
 */
const server = new Hapi.Server();
server.connection({port: config.port});

/**
 * After that we will loading all routes
 */
FileFinder.getGlobbedFiles('./src/routes.js').forEach(route => {
  require(path.resolve(route))(server);
  console.log(chalk.red.bgWhite('Loaded:'), route);
});

/**
 * Set base path for swagger ui
 */
_.assign(SwaggerPlugin.options, {basePath: server.info.uri});

/**
 * Register plugins and error handling
 */
server.register([Inert, Vision, SwaggerPlugin, JwtAuthPlugin.JwtAuth], (err) => {
  if (err) {
    throw(err);
  }

  /**
   * Check Jwt authentication
   */
  server.auth.strategy('jwt', 'jwt', true, JwtAuthPlugin.JwtConfig);

  /**
   * Start server
   */
  server.start(() => {
    console.log(chalk.red.bgWhite('Server running at:'), server.info.uri);
  });
});