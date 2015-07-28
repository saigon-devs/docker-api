'use strict';

import ContainerData from '../../static/data/containers.json';
import DockerApi from '../libs/docker-api';
import ContainerModel from '../models/container';
import config from '../../config/config';

const dockerApi = new DockerApi(config.app.dockerServer, config.app.dockerPort);

class ContainerController {
    getAllAction(request, reply) {

        dockerApi.getAllContainers({all: 1}, function (resData) {
            let containerList = [];
            let containers = JSON.parse(resData.data);
            for (var container of containers) {
                containerList.push(new ContainerModel(
                    container.Id,
                    container.Command,
                    container.Names,
                    container.Image,
                    container.Status,
                    container.Ports,
                    container.Status.indexOf('Exited') >= 0 ? 0 : 1));
            }

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