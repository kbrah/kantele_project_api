import mongoose from 'mongoose';
import User from './models/user';
import _ from 'lodash';

const validate = (decoded, request, callback) => {
    let creds;
    User.findOne({ username: decoded._doc.username }).then((err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (decoded._doc.username === user.username && decoded._doc.password === user.password) {
                creds = user;
            }
        }
    })
    let error

    if (_.isEmpty(creds)) {
        return callback(error, true, creds)
    } else {
        return callback(error, false)
    }
}

exports.register = (server, options, next) => {

    server.register(
        require('hapi-auth-jwt2'),
        (err) => {
            if (err) {
                console.log(err)
            }

            server.auth.strategy('jwt', 'jwt', {
                key: 'mysecret',
                validateFunc: validate,
                verifyOptions: { algorithms: ['HS256'] }
            });

            server.auth.default('jwt');


        });
    next();
}

exports.register.attributes = {
    name: 'auth'
}