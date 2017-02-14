import JWT from 'jsonwebtoken';

module.exports = {
    index: {
        handler: (request, reply) => {
            const db = request.server.app.db;
            db.books.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        },
        auth: 'jwt'
    },
    register: {
        handler: (request, reply) => {
            const db = request.server.app.db;

            const newUser = {
                'username': request.payload.username,
                'password': request.payload.password
            }

            if (!newUser.username || !newUser.password) {
                reply().code(400);
            }
            db.users.insert(request.payload, (err, result) => {
                if (err) {
                    throw err
                }
                reply("success").code(201)
            });
        },
        auth: false
    },
    login: {
        handler: (request, reply) => {
            const userLoggingIn = {
                'username': request.payload.username,
                'password': request.payload.password
            }
            if (!userLoggingIn.username || !userLoggingIn.password) {
                reply().code(400)
            }

            const db = request.server.app.db;
            db.users.findOne({ 'username': userLoggingIn.username }, (err, user) => {
                if (err || !user) {
                    reply("Wrong password or username!").code(401)
                    return
                }
                if (user.password === userLoggingIn.password) {

                    const token = JWT.sign(user, 'mysecret')

                    reply("Here's your token").header("Authorization", token);
                } else {
                    reply("Wrong password or username!").code(401)
                }
                console.log(user)
            })
        },
        auth: false
    }
}