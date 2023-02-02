const app = require('express')
const router = require('express-promise-router')()


const userController = require('../controllers/user')


router.route('/')
    .get(userController.index)
    .post(userController.createUser)

router.route('/:userId')
    .get(userController.getUser)
    .put(userController.replaceUser)
    .patch(userController.updateUser)


router.route('/:userId/decks')
    .post(userController.createUserDeck)
    .get(userController.getUserDecks)


    
module.exports = router