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
export const cookie_options = {
    ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
    encoding: 'none',    // we already used JWT to encode
    isSecure: true,      // warm & fuzzy feelings
    isHttpOnly: true,    // prevent client alteration
    clearInvalid: false, // remove invalid cookies
    strictHeader: true,
    path: '/'   // don't allow violations of RFC 6265
}

exports.register.attributes = {
    name: 'auth'
}