'use strict';

import ContainerData from '../../static/data/containers.json';
import DockerApi from '../libs/docker-api';
import ContainerModel from '../models/container';

import ContainerService from '../services/container.service'

class ContainerController {
    getAllAction(request, reply) {
        ContainerService.getAllContainers(function(containerList){
            reply(containerList).code(200);
        });
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