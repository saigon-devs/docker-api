'use strict';

import ContainerData from '../../static/data/containers.json';

class ContainerController {
    getAllAction(request, reply) {
        reply(ContainerData);
    }

    getByIdAction(request, reply) {
        reply('get by id');
    }

    insertAction(request, reply) {
        reply('insert');
    }

    updateAction(request, reply) {
        reply('update');
    }

    deleteAction(request, reply) {
        reply('delete');
    }
}

export default new ContainerController();