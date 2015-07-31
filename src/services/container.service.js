'use strict';

import DockerApi from 'docker-api-wrapper';
import config from '../../config/config';
import ContainerModel from '../models/container';

const dockerApi = new DockerApi(config.app.dockerServer, config.app.dockerPort);

class ContainerService{
    getAllContainers(){
        return new Promise((resolve, reject) => {
            dockerApi.getAllContainers({all: 1}, (resData) => {
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
                resolve(containerList);
            });
        });
    };

    getContainerById(containerId){
        return new Promise((resolve, reject) => {
            dockerApi.queryInspectContainer(containerId, (resData) => {
               resolve(resData.data);
            });
        });
    };
}

export default new ContainerService();