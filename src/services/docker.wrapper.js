'use strict'

import RestClient from 'node-rest-client'
import queryString from 'querystring';

const client = new RestClient.Client();

export default class DockerWrapper {
  constructor(server, port, protocol) {
    this.server = server;
    this.port = port;
    this.protocol = protocol;
    this.baseAddress = this.protocol + '://' + this.server + ':' + this.port;
  }

  getContainers(query) {
    return new Promise((resolve, reject) => {
      var request = this.baseAddress + '/containers/json?' + query;
      console.log('GET ' + request);

      client.get(request, (data, response) => {
        resolve(data);
      });
    });
  }

  getAllContainers() {
    return this.getContainers('all=1');
  }

  getContainerById(containerId) {
    let querydataString = queryString.stringify({all: 0, before: containerId, size: 1});
    return this.getContainers(querydataString);
  }

  createContainer(container) {
    return new Promise((resolve, reject) => {
      var containerRequestData = {
        "Hostname": "",
        "User": "",
        "Memory": 0,
        "MemorySwap": 0,
        "AttachStdin": false,
        "AttachStdout": true,
        "AttachStderr": true,
        "PortSpecs": null,
        "Privileged": false,
        "Tty": false,
        "OpenStdin": false,
        "StdinOnce": false,
        "Env": null,
        "Dns": null,
        "Image": container.image,
        "Volumes": {},
        "VolumesFrom": "",
        "WorkingDir": ""
      };

      let request = this.baseAddress + '/containers/create';
      console.log('POST ' + request);
      console.log(JSON.stringify(containerRequestData));

      client.post(request, containerRequestData, (data, response) => {
        resolve(response);
      });
    });
  }
}