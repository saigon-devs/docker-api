'use strict';

import ContainerService from '../services/container.service';
import { Container } from 'docker-api-wrapper';

class ContainerController {
  getAllAction(request, reply) {
    reply(
      ContainerService.getAllContainers()
    ).code(200);
  }

  inspectContainerAction(request, reply) {
    const id = request.params.id;
    reply(
      ContainerService.inspectContainer(id)
    ).code(200);
  }

  createAction(request, reply) {
    var container = {
      "image": request.payload.image
    };

    //reply(ContainerService.createContainer(container)).code(200);
  }

  getContainerProcesses(request, reply) {
    //reply(ContainerService.getContainerProcesses(request.params.id)).code(200);
  }

  updateAction(request, reply) {
    reply('update');
  }

  deleteAction(request, reply) {
    reply('delete');
  }
}

export default new ContainerController();