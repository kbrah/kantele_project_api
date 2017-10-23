import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user';
import Boom from 'boom'
import passport from 'passport';
import { cookie_options } from '../auth.js'

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
                        const token = JWT.sign({ username: user.username, password: user.password }, 'mysecret')
                        console.log(cookie_options)
                        reply({
                            text: "You have been authenticated",
                            username: user.username,
                            role: user.role,
                            email: user._id
                        }).header("Authorization", token).state("token", token, {
                            isHttpOnly: true,
                            ttl: 365 * 24 * 60 * 60 * 1000,
                            encoding: 'none',
                            isSecure: true,
                        }).code(200)
                    } else {
                        reply("Wrong username or password").code(401);
                    }
                })
            });
        },
        auth: false
    },
    logout: {
        handler: () => {
            return reply({ text: 'You have been logged out' }).unstate('token', cookie_options)
        },
        auth: 'jwt'
    },
    facebookLogin: {
        handler: (request, reply) => {

        },
        auth: false
    }
}