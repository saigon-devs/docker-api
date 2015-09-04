'use strict';

import _ from 'lodash';
import glob from 'glob';

class FileFinder {
  getGlobbedFiles(globPatterns, removeRoot) {
    // For context switching
    var _this = this;

    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // The output array
    var output = [];

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
      globPatterns.forEach(globPattern => {
        output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
      });
    } else if (_.isString(globPatterns)) {
      if (urlRegex.test(globPatterns)) {
        output.push(globPatterns);
      } else {
        glob(globPatterns, {
          sync: true
        }, (err, files) => {
          if (removeRoot) {
            files = files.map(file => {
              return file.replace(removeRoot, '');
            });
          }

          output = _.union(output, files);
        });
      }
    }

    return output;
  }
}

export default new FileFinder();