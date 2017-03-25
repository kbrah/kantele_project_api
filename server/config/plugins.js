module.exports = [{
        register: require('hapi-named-routes')
    },
    {
        register: require('../db')
    },
    {
        register: require('hapi-mongoose'),
        options: {
            bluebird: false,
            uri: '35.158.71.229/kanttidb'
        }
    },
    {
        register: require('../auth')
    }
]