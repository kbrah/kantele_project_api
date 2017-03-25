const plugins = require('./server/config/plugins');
import authRoutes from './server/routes/authRoutes';
import compositionRoutes from './server/routes/compositionRoutes';

exports.register = (server, options, next) => {


    server.register(plugins, (err) => {
        if (err) {
            return next(err)
        }

        server.route(authRoutes);
        server.route(compositionRoutes)
        next();
    });
};

const Package = require("./package.json");

exports.register.attributes = {
    name: Package.name,
    version: Package.version
}