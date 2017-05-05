import compositionController from '../controllers/compositionController'

export default [{
        method: 'POST',
        path: '/composition/add',
        config: compositionController.insertComposition
    },
    {
        method: 'GET',
        path: '/composition/get/all',
        config: compositionController.getAllCompositions
    },
    {
        method: 'POST',
        path: '/composition/edit',
        config: compositionController.editComposition
    }
]