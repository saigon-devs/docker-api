'use strict';

import config from '../../config/config';
import ContainerModel from '../models/container';
import { Container } from 'docker-api-wrapper';

const container = new Container(
  config.app.dockerServer,
  config.app.dockerPort
);

class ContainerService {
  getAllContainers() {
    const options = {
      queryData: {
        all: 1
      }
    };

    return container
      .getAllContainers(options)
      .then(result => {
        let containers = [];
        for (var c of result.data || []) {
          containers.push(
            new ContainerModel(
              c.Id,
              c.Command,
              c.Names,
              c.Image,
              c.Status,
              c.Ports,
              c.Status.indexOf('Exited') >= 0 ? 0 : 1));
        }
        return containers;
      }).catch(err => {
        console.error(err);
      });
  }

  inspectContainer(containerId) {
    return container
      .queryInspectContainer({containerId: containerId})
      .then(result => {
        console.log(result);
        if (result.data !== null) {
          return result.data;
        }
      }).catch(err => {
        console.error(err);
      });
  }

  createContainer(container) {
    //todo: will implement this
    return null;
  }

  getContainerProcesses(containerId) {
    //todo: will implement this
    return null;
  }
}

export default new ContainerService();