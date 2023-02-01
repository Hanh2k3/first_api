const app = require('express')
const router = require('express-promise-router')()


const userController = require('../controllers/user')

router.route('/')
    .get(userController.index)
    .post(userController.createUser)
    
module.exports = router