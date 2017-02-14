const validate = (decoded, request, callback) => {
    console.log(decoded);
    //console.log(request);
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