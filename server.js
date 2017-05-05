'use strict';

//const Hapi = require('hapi');
import Hapi from 'hapi';
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            cors: {
                origin: ['http://localhost:4200']
            }
        }
    }
});
server.connection({
    port: 8080
});

//Connect to db

const registerOpts = [{
    register: require('./index')
}];

// Add logging
registerOpts.push({
    register: require("good"),
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
});

//Load plugins and start server
server.register(
    registerOpts,
    (err) => {

        if (err) {
            throw err;
        }

        // Start the server
        server.start((err) => {
            console.log('Server running at:', server.info.uri);
        });

    }
);