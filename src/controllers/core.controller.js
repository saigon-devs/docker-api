'use strict';

export default function (server) {
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, response) => {
            response('Hello, world 123!');
        }
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: (request, response) => {
            response('Hello, ' + encodeURIComponent(request.params.name) + '!');
        }
    });
}