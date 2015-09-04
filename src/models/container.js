'use strict';

/**
 * Created by phihuynh on 7/27/15.
 */

export default class ContainerModel {
  constructor(id, command, name, image, status, ports, isRunning) {
    this.id = id;
    this.command = command;
    this.name = name;
    this.image = image;
    this.status = status;
    this.ports = ports;
    this.isRunning = isRunning;
  }
}