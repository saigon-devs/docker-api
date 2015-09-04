'use strict';

import _ from 'lodash';
import glob from 'glob';

/**
 * FileFinder class that implement with glob lib,
 * using for finding all the files with the glob pattern
 */
class FileFinder {
  getGlobbedFiles(globPatterns, removeRoot) {
    /**
     * For context switching
     * @type {FileFinder}
     * @private
     */
    var _this = this;

    /**
     * URL paths regex
     * @type {RegExp}
     */
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    /**
     * The output array
     * @type {Array}
     */
    var output = [];

    /**
     * If glob pattern is array so we use each pattern in a recursive way,
     * otherwise we use glob
     */
    if (_.isArray(globPatterns)) {
      globPatterns.forEach(globPattern => {
        output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
      });
    } else if (_.isString(globPatterns)) {
      if (urlRegex.test(globPatterns)) {
        output.push(globPatterns);
      } else {
        /**
         * Start to map and replace files
         */
        glob(globPatterns, {
          sync: true
        }, (err, files) => {
          if (removeRoot) {
            files = files.map(file => {
              return file.replace(removeRoot, '');
            });
          }

          /**
           * Just union all files into one output
           */
          output = _.union(output, files);
        });
      }
    }

    return output;
  }
}

export default new FileFinder();