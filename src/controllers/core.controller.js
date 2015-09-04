'use strict';

import Jwt from 'jsonwebtoken';
import config from '../../config/config';

class CoreController {
  indexAction(request, reply) {
    reply('It works. Go to <a href="' + request.server.info.uri + '/documentation">Swagger UI<//a>');
  }

  authAction(request, reply) {
    //todo: need to read username/ password from database
    let info = request.payload;

    if (info.username != config.jwt_username
      || info.password != config.jwt_password) {
      reply('Invalid username or password').code(401);
      return;
    }

    var session = {
      valid: true, // this will be set to false when the person logs out
      username: config.jwt_username,
      password: config.jwt_password,
      exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
    };

    // sign the session as a JWT
    var token = Jwt.sign(session, config.jwt_secret_key); // synchronous
    console.log(token);

    reply({'auth-token': token}).header('Authorization', token);
  }

  logoutAction(request, reply) {
    //todo: reference at https://github.com/dwyl/hapi-auth-jwt2-example/blob/master/index.js
  }
}

export default new CoreController();