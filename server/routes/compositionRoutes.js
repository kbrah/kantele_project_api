import compositionController from '../controllers/compositionController'

export default [{
    method: 'POST',
    path: '/composition/add',
    config: compositionController.insertComposition
}, ]