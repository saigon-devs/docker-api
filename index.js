'use strict';

import Hapi from 'hapi';
import path from 'path';
import chalk from 'chalk';
import config from './config/config';

const server = new Hapi.Server();
server.connection({port: config.port});

config.getGlobbedFiles('./src/controllers/**/*.js').forEach(controllerPath => {
    require(path.resolve(controllerPath))(server);
    console.log(chalk.red.bgWhite('Loaded:'), controllerPath);
});

server.start(() => {
    console.log(chalk.red.bgWhite('Server running at:'), server.info.uri);
});