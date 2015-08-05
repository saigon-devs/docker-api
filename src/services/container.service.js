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
            dockerApi.getAllContainers({all: 0, before: containerId, size: 1}, (resData) => {
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

    createContainer(container){
        return new Promise((resolve, reject) => {

            var containerRequestData = {
                "Hostname":"",
                "User":"",
                "Memory":0,
                "MemorySwap":0,
                "AttachStdin":false,
                "AttachStdout":true,
                "AttachStderr":true,
                "PortSpecs":null,
                "Privileged": false,
                "Tty":false,
                "OpenStdin":false,
                "StdinOnce":false,
                "Env":null,
                "Dns":null,
                "Image": container.image,
                "Volumes":{},
                "VolumesFrom":"",
                "WorkingDir":""
            };

            dockerApi.createContainer(containerRequestData, (resData) => {
                resolve(resData.data);
            });
        });
    };
}

export default new ContainerService();