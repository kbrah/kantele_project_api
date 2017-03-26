import authController from '../controllers/authController'


export default [{
        method: 'POST',
        path: '/register',
        config: authController.register
    },
    {
        method: 'POST',
        path: '/login',
        config: authController.login
    },
    {
        method: 'POST',
        path: '/facebook/login',
        config: authController.facebookLogin
    }
]