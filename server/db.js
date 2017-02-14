'use strict';

const mongojs = require('mongojs');

exports.register = (server, options, next) => {

    server.app.db = mongojs('localhost:27017/test', ['books', 'users']);
    next();
};

exports.register.attributes = {
    name: 'db'
};