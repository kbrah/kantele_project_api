'use strict';

import mongoose from 'mongoose';

const mongojs = require('mongojs');

exports.register = (server, options, next) => {

    //server.app.db = mongojs('localhost:27017/test', ['books', 'users']);

    mongoose.connect(
        "pilvi.rocks:5001/kanttidb", {
            user: 'lasse',
            pass: 'lassenKantti',

        },
        (err) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log("db connection established")
        })

    next();
};

exports.register.attributes = {
    name: 'db'
};
