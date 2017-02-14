const controller = require('../controllers/base');


module.exports = [{
    method: 'GET',
    path: '/',
    config: controller.index
}]