'use strict';

import ContainerData from '../../static/data/containers.json';
import ContainerService from '../services/container.service';

class ContainerController {
    getAllAction(request, reply) {
        reply(ContainerService.getAllContainers()).code(200);
    }

    getByIdAction(request, reply) {
        reply(ContainerService.getContainerById(request.params.id)).code(200);
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