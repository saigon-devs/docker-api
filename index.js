'use strict';

import Hapi from 'hapi';
import Swagger from 'hapi-swagger';
import path from 'path';
import chalk from 'chalk';
import config from './config/config';
var pack = require('./package.json');

// init server
const server = new Hapi.Server();
server.connection({port: config.port});

// after that we will loading all routes
config.getGlobbedFiles('./src/routes.js').forEach(route => {
    require(path.resolve(route))(server);
    console.log(chalk.red.bgWhite('Loaded:'), route);
});

// register plugins
const swaggerOptions = {
    basePath: server.info.uri,
    apiVersion: pack.version
};
server.register({
    register: require('hapi-swagger'),
    options: swaggerOptions
}, function (err) {
    if (err) {
        throw(err);
    }
    // Start server
    server.start(() => {
        console.log(chalk.red.bgWhite('Server running at:'), server.info.uri);
    });
});