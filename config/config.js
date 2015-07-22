'use strict';

import _ from 'lodash';
import allEnv from './env/all';

const extendEnv = require('./env/' + process.env.NODE_ENV) || {};

export default _.extend(
    allEnv,
    extendEnv
);