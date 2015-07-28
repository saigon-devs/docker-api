'use strict';

import CoreController from './controllers/core.controller';
import ContainerController from './controllers/container.controller';
import joi from 'joi';

export default function (server) {
    server.route({
        method: 'GET',
        path: '/',
        handler: CoreController.indexAction,
        config: {
            auth: false
        }
    });

    server.route({
        method: 'POST',
        path: '/users/auth',
        config: {
            auth: false,
            handler: CoreController.authAction,
            description: 'Get Authentication Token',
            tags: ['api', 'auth'],
            validate: {
                payload: {
                    username: joi.string()
                        .required()
                        .description('username'),
                    password: joi.string()
                        .required()
                        .description('password')
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/users/logout',
        config: {
            auth: false,
            handler: CoreController.logoutAction,
            description: 'Log out',
            tags: ['api', 'auth']
        }
    });

    server.route({
        method: 'GET',
        path: '/containers',
        config: {
            auth: false,
            handler: ContainerController.getAllAction,
            description: 'Get all containers',
            tags: ['api', 'container'],
            validate: {
                headers: joi.object({
                    authorization: joi.string()
                }).options({allowUnknown: true})
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/containers/{id}',
        config: {
            auth: false,
            handler: ContainerController.getByIdAction,
            description: 'Get a container by id',
            tags: ['api', 'container'],
            validate: {
                headers: joi.object({
                    authorization: joi.string()
                }).options({allowUnknown: true}),
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
        config: {
            auth: false,
            handler: ContainerController.insertAction,
            description: 'Insert a new container',
            tags: ['api', 'container'],
            validate: {
                headers: joi.object({
                    authorization: joi.string()
                }).options({allowUnknown: true}),
                payload: {
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
        config: {
            auth: false,
            handler: ContainerController.updateAction,
            description: 'Update a container',
            tags: ['api', 'container'],
            validate: {
                headers: joi.object({
                    authorization: joi.string()
                }).options({allowUnknown: true}),
                payload: {
                    id: joi.number()
                        .required()
                        .description('container id'),
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
        method: 'DELETE',
        path: '/containers/{id}',
        config: {
            auth: false,
            handler: ContainerController.deleteAction,
            description: 'Delete a container',
            tags: ['api', 'container'],
            validate: {
                headers: joi.object({
                    authorization: joi.string()
                }).options({allowUnknown: true}),
                payload: {
                    id: joi.number()
                        .required()
                        .description('container id')
                }
            }
        }
    });
}