const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcryptjs = require('bcryptjs')

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


UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
        
    }
})

UserSchema.methods.verifyPassword =  async function(password) {
    try {
        return await bcryptjs.compare(password, this.password)
    } catch (error) {
        throw new Error(error)      
    }
}

module.exports = mongoose.model('User', UserSchema)