module.exports = [{
        register: require('hapi-named-routes')
    },
    {
        register: require('../db')
    },
    {
        register: require('../auth')
    }
]