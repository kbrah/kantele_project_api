const controller = require('../controllers/base');


module.exports = [{
        method: 'GET',
        path: '/',
        config: controller.index
    },
    {
        method: 'POST',
        path: '/register',
        config: controller.register
    },
    {
        method: 'POST',
        path: '/login',
        config: controller.login
    }
]