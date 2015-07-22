'use strict';

class CoreController {
    indexAction(request, reply) {
        reply('Hello, world!');
    }
}

export default new CoreController();