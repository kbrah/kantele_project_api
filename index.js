const plugins = require('./server/config/plugins');

exports.register = (server, options, next) => {


    server.register(plugins, (err) => {
        if (err) {
            return next(err)
        }

        server.route(require('./server/routes/base'));
        next();
    });
};

const Package = require("./package.json");

exports.register.attributes = {
    name: Package.name,
    version: Package.version
}