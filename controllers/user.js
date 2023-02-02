const Deck = require('../models/Deck')
const User = require("../models/User")

const index = async (req, res) => {
    const users = await User.find({});
    return res.json(users);
}

const getUser = async (req, res) => {
    const {userId} = req.params
    const user = await User.findById(userId)
    return res.status(200).json(user)
}

const getUserDecks = async (req, res, next) => {
    const { userId } = req.params
  
   
   // get deck of user 
    const listDeck = await User.findById(userId).populate('decks')

   return res.status(200).json({listDeck: listDeck.decks})    
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

const replaceUser = async (req, res, next) => {
    const { userId } = req.params 
    const userUpdate = req.body
    await User.findByIdAndUpdate(userId, userUpdate)
    
    return res.json({
        "message": "Update successful"
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
    index,
    createUser,
    createUserDeck,
    replaceUser, 
    updateUser,
    getUser,
    getUserDecks,
    test
}
