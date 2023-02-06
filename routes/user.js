const app = require('express')
const router = require('express-promise-router')()
const {validateBody, validateParam, schemas} = require('../helpers/routeHelpers')


const userController = require('../controllers/user')


router.route('/')
    .get(userController.index)
    .post(validateBody(schemas.userSchema),userController.createUser)

router.route('/:userId')
    .get(validateParam(schema, 'userId'),userController.getUser)
    .put(validateParam(schema, 'userId'),validateBody(schemas.userSchema), userController.replaceUser)
    .patch(validateParam(schema, 'userId'),validateBody(schemas.optionSchema),userController.updateUser)


router.route('/signIn').post(validateBody(schemas.signInSchema),userController.signIn)
router.route('/signUp').post(validateBody(schemas.signUpSchema),userController.signUp)
router.route('/user/secret').get(userController.secret)


router.route('/:userId/decks')
    .post(validateParam(schema, 'userId'), validateBody(schemas.deckSchema),userController.createUserDeck)
    .get(validateParam(schema, 'userId'),userController.getUserDecks)


    
module.exports = router