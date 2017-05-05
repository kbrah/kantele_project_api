import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user';
import Boom from 'boom'
import passport from 'passport';
module.exports = {
    index: {
        handler: (request, reply) => {
            User.findOne({ username: 'Lasse' }, (err, user) => {
                reply("jee").code(200);
            })
        },
        auth: 'jwt'
    },
    register: {
        handler: (request, reply) => {
            const newUser = new User({
                'email': request.payload.email,
                'username': request.payload.username,
                'password': request.payload.password,
                'role': 'user'
            })
            newUser.save((err) => {
                if (err) {
                    console.log(err)
                    reply(Boom.wrap(err, 400));
                    return;
                }

                reply("success").code(201)
            })
        },
        auth: false
    },
    login: {
        handler: (request, reply) => {
            User.findOne({ username: request.payload.username }, (err, user) => {
                if (err || !user) {
                    reply().code(401)

                    return;
                }

                user.comparePassword(request.payload.password, (err, isMatch) => {
                    if (err) {
                        reply("Wrong username or password").code(401);
                    }
                    if (isMatch) {
                        const token = JWT.sign(user, 'mysecret')

                        reply(token).code(200)
                    } else {
                        reply("Wrong username or password").code(401);
                    }
                })
            });
        },
        auth: false
    },
    facebookLogin: {
        handler: (request, reply) => {

        },
        auth: false
    }
}