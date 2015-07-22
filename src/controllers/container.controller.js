'use strict';

export default class ContainerController {
    static getAllAction(request, reply) {
        reply('get all');
    }

    static getByIdAction(request, reply) {
        reply('get by id');
    }

    static insertAction(request, reply) {
        reply('insert');
    }

    static updateAction(request, reply) {
        reply('update');
    }

    static deleteAction(request, reply) {
        reply('delete');
    }
}