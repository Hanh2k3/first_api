const app = require('express')
const router = app.Router()

const userController = require('../controllers/user')

router.route('/')
    .get(userController.index)

module.exports = router