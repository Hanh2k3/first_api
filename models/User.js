const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    firstName : {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
        minimum: 8,
    },
    decks: [{
        type: Schema.Types.ObjectId, 
        ref: 'Deck'
    }]
})

module.exports = mongoose.model('User', UserSchema)