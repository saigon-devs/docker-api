'use strict';

import ContainerData from '../../static/data/containers.json';
import ContainerService from '../services/container.service';
import ContainerModel from '../models/container';

class ContainerController {
    getAllAction(request, reply) {
        var result = ContainerService.getAllContainers();
        console.log(result);
        reply(result).code(200);
    }

    getByIdAction(request, reply) {
        reply(ContainerService.getContainerById(request.params.id)).code(200);
    }

    createAction(request, reply) {
        var container = {
          "image": request.payload.image
        };

        reply(ContainerService.createContainer(container)).code(200);
    }

    getContainerProcesses(request, reply){
        reply(ContainerService.getContainerProcesses(request.params.id)).code(200);
    }

    updateAction(request, reply) {
        reply('update');
    }

    deleteAction(request, reply) {
        reply('delete');
    }
}

export default new ContainerController();