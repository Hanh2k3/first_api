
const User = require('../models/User')

const index = (req, res) => {
    return res.json({
        message: 'Router success'
    })
}

const createUser = (req, res, next) => {
    console.log(req.body)
    // const newUser = req.body 
    // console.log(newUser)
  
}

module.exports = {
    index, 
    createUser
}