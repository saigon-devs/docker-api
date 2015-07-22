'use strict';

import CoreController from './controllers/core.controller';
import ContainerController from './controllers/container.controller';
import joi from 'joi';

export default function (server) {
    server.route({
        method: 'GET',
        path: '/',
        handler: CoreController.indexAction
    });

    server.route({
        method: 'GET',
        path: '/containers',
        handler: ContainerController.getAllAction,
        config: {
            description: 'Get all containers',
            tags: ['api', 'container']
        }
    });

    server.route({
        method: 'GET',
        path: '/containers/{id}',
        handler: ContainerController.getByIdAction,
        config: {
            description: 'Get container by id',
            tags: ['api', 'container'],
            validate: {
                params: {
                    id: joi.number()
                        .required()
                        .description('container id')
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/containers',
        handler: ContainerController.insertAction,
        config: {
            description: 'Insert a new container',
            tags: ['api', 'container'],
            validate: {
                params: {
                    name: joi.string()
                        .required()
                        .description('container name'),
                    description: joi.string()
                        .description('container description')
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/containers/{id}',
        handler: ContainerController.updateAction,
        config: {
            description: 'Update a container',
            tags: ['api', 'container'],
            validate: {
                params: {
                    id: joi.number()
                        .required()
                        .description('container id')
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/containers/{id}',
        handler: ContainerController.deleteAction,
        config: {
            description: 'Delete a container',
            tags: ['api', 'container'],
            validate: {
                params: {
                    id: joi.number()
                        .required()
                        .description('container id')
                }
            }
        }
    });
}