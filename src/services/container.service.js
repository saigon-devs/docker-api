'use strict';

import config from '../../config/config';
import ContainerModel from '../models/container';
import DockerWrapper from './docker.wrapper.js'

const dockerApi = new DockerApi(config.app.dockerServer, config.app.dockerPort);
const dockerWrapper = new DockerWrapper(config.app.dockerServer, config.app.dockerPort, config.app.dockerProtocol);
//const client = new restClient.Client();

class ContainerService{
    getAllContainers(){
        return new Promise((resolve, reject) => {
            dockerWrapper.getAllContainers()
                .then(data => {
                    let containerList = [];
                    for (var container of data) {
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
            dockerWrapper.getContainerById(containerId)
                .then(data => {
                    let containerList = [];
                    for (var container of data) {
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
        return dockerWrapper.createContainer(container);
    };

    getContainerProcesses(containerId){
        return new Promise((resolve, reject) => {

            //client.get('http://' + config.app.dockerServer + ':' + config.app.dockerPort + '/containers/c3e4500d95c7d9c5d85a3a2d807321c4675e4ebf5c4f3286f83c8e06e46bd14c/json', function(data, response){
            //    // parsed response body as js object
            //    console.log(data);
            //    // raw response
            //    console.log(response);
            //
            //    resolve(data);
            //});
        });
    };
}

export default new ContainerService();