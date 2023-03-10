const Deck = require('../models/Deck')
const User = require("../models/User")
const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs/index')


const authGoogle = async (req, res) => {
    const token = endCode(req.user._id)
    res.setHeader('Authorization', token)
    return res.json({ 
        success: 'login with google success'
    })
    
}

const authFacebook = async (req, res) => {
    const token = endCode(req.user._id)
    console.log(req.user)

    res.setHeader('Authorization', token)
    return res.json({
        success: 'login with facebook success'
    })
}

const index = async (req, res) => {
    const users = await User.find({});
    return res.json(users);
}

const endCode = (userId) => {
   const token =  JWT.sign({
        iss: "Le Hanh",
        sub: userId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3),

   }, JWT_SECRET)

   return token 
}


const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    return res.json(newUser);
}

const createUserDeck = async (req, res, next) => {
    const { userId } = req.params 

    // create new Deck 
    const newDeck = new Deck(req.body)

    // get user from userId
    const user = await User.findById(userId)

    // add information user for deck 
    newDeck.owner = user

    // add deck_id into user 
    const deckId =  newDeck._id.toString()
    user.decks.push(deckId)

    await user.save()
    await newDeck.save()

    return res.status(200).json({Deck: newDeck})

}

const getUserDecks = async (req, res, next) => {
    const { userId } = req.params
  
   
   // get deck of user 
    const listDeck = await User.findById(userId).populate('decks')

    
   return res.status(200).json({listDeck: listDeck.decks})    
}

const getUser = async (req, res) => {
    const {userId} = req.params   
    const user = await User.findOne({userId: userId})
    console.log(user)
    return res.status(200).json(user)
}

const replaceUser = async (req, res, next) => {
    const { userId } = req.params 
    const userUpdate = req.body
    await User.findByIdAndUpdate(userId, userUpdate)
    
    return res.json({
        "message": "Update successful"
    })
}

const signIn = async (req, res, next) => {
    return res.json({success: 'login success'})

}

const signUp = async (req, res, next) => {
    const newUser = new User(req.body)
    await newUser.save()
    const token = endCode(newUser._id)

    res.setHeader('Authorization', token)
    return res.status(201).json({
        message: 'Sign up user success !'
    })
}

const secret = async (req, res, next) => {
    return res.status(200).json({
        resource : "True"
    })
}

const updateUser = async (req, res, next) => {
    const { userId } = req.params 
    const userUpdate = req.body
    await User.findByIdAndUpdate(userId, userUpdate)
    return res.json({
        "message": "Update successful"
    })
}

const test = (req, res) => {
    console.log('test')
}
module.exports = {
    authGoogle,
    authFacebook,
    createUser,
    createUserDeck,
    index,
    getUser,
    getUserDecks,
    replaceUser, 
    signIn,
    signUp,
    secret,
    updateUser,
    test
}
