const app = require('express')
const router = app.Router()

const userController = require('../controllers/user')

router.route('/')
    .get(userController.index)
    .post(userController.createUser)

module.exports = router