'use strict';

import JwtAuth from 'hapi-auth-jwt2';
import config from '../config/config';

let jwtPlugin = {
    JwtAuth: JwtAuth,
    JwtConfig: {
        key: config.jwt_secret_key,
        verifyOptions: {algorithms: ['HS256']},
        validateFunc: (decoded, request, callback) => {
            //todo: need to read username/ password from database
            if (decoded.username != config.jwt_username
                && decoded.password != config.jwt_password) {
                return callback(null, false);
            }
            else {
                return callback(null, true);
            }
        }
    }
};

export default jwtPlugin;