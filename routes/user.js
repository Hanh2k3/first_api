const app = require('express')
const router = require('express-promise-router')()
const {validateBody, validateParam, schemas} = require('../helpers/routeHelpers')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')


const userController = require('../controllers/user')


router.route('/')
    .get(userController.index)
    .post(validateBody(schemas.userSchema),userController.createUser)

router.route('/:userId')
    .get(validateParam(schemas.schema, 'userId'),userController.getUser)
    .put(validateParam(schemas.schema, 'userId'),validateBody(schemas.userSchema), userController.replaceUser)
    .patch(validateParam(schemas.schema, 'userId'),validateBody(schemas.optionSchema),userController.updateUser)

router.route('/auth/google').post(passport.authenticate('google-plus-token', {session: false}),userController.authGoogle)
router.route('/auth/facebook').post(passport.authenticate('facebook-token', {session: false}), userController.authFacebook)

router.route('/signIn').post(validateBody(schemas.signInSchema),passport.authenticate('local', {session: false}),userController.signIn)
router.route('/signUp').post(validateBody(schemas.signUpSchema),userController.signUp)
router.route('/user/secret').get(passport.authenticate('jwt', {session: false}),userController.secret)

router.route('/:userId/decks')
    .post(validateParam(schemas.schema,  'userId'), validateBody(schemas.deckSchema),userController.createUserDeck)
    .get(validateParam(schemas.schema,  'userId'),userController.getUserDecks)
   
module.exports = router