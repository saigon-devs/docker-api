import DockerApi from '../libs/docker-api'
import config from '../../config/config';
import ContainerModel from '../models/container';

const dockerApi = new DockerApi(config.app.dockerServer, config.app.dockerPort);

class ContainerService{
    getAllContainers(callback){
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

            if(callback != null)
                callback(containerList);
        });
    };
}

export default new ContainerService();