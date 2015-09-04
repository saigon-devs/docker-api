'use strict';

import Swagger from 'hapi-swagger';
import pack from '../../package.json';

let SwaggerPlugin = {
  register: Swagger,
  options: {
    apiVersion: pack.version
  }
};

export default SwaggerPlugin;