const app = require('express')
const router = require('express-promise-router')()
const {validateBody, validateParam, schema, userSchema, optionSchema, deckSchema } = require('../helpers/routeHelpers')


const userController = require('../controllers/user')


router.route('/')
    .get(userController.index)
    .post(validateBody(userSchema),userController.createUser)

router.route('/:userId')
    .get(validateParam(schema, 'userId'),userController.getUser)
    .put(validateParam(schema, 'userId'),validateBody(userSchema), userController.replaceUser)
    .patch(validateParam(schema, 'userId'),validateBody(optionSchema),userController.updateUser)


router.route('/:userId/decks')
    .post(validateParam(schema, 'userId'), validateBody(deckSchema),userController.createUserDeck)
    .get(validateParam(schema, 'userId'),userController.getUserDecks)


    
module.exports = router