const Joi = require("joi");
const User = require("../models/User");

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body);

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error);
        } else {
            next();
        }
    };
};

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({ userId: req.params[name] });

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error);
        } else {
            next();
        }
    };
};

const validateUniqueEmail = async (email, helper) => {
    // Your logic to check if the email is unique
    const emailExists = await User.findOne({ email: email });
    return emailExists ? false : true;
};

const schemas = {
    // deck schema
    deckSchema: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().min(5).max(255).required(),
        total: Joi.number().min(1).max(100).required(),
    }),

    // usr schema
    userSchema: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
    }),

    // pram schema
    schema: Joi.object({
        userId: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{24}$"))
            .required(),
    }),

    // option schema
    optionSchema: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
    }),

    // sign schema
    signInSchema: Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(8),
    }),

    signUpSchema: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string()
            .email()
            .custom(validateUniqueEmail, "Email already exit"), // false thi bat lai
        password: Joi.string().min(8),
    }),
};

module.exports = {
    validateParam,
    validateBody,
    schemas,
};
