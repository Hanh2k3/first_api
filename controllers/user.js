const User = require("../models/User");

const index = async (req, res) => {
    const users = await User.find({});
    return res.json(users);
};

const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    return res.json(newUser);
};

module.exports = {
    index,
    createUser,
};
