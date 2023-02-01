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

const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    return res.json(newUser);
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

module.exports = {
    index,
    createUser,
    replaceUser, 
    updateUser,
    getUser
}
