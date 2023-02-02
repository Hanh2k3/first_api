const Joi = require('joi')


const validateBody = (schema) => {
    return (req, res, next) => {
      
        const validatorResult = schema.validate(req.body)

        if(validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            next()
        }
    }
    
}

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({userId: req.params[name]})

        if(validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            next()
        }
    }

}

// deck schema 
const deckSchema = Joi.object({ 
    
    name: Joi.string().required(),
    description: Joi.string().min(5).max(255).required(),
    total: Joi.number().min(1).max(100).required(),
})

// validate user
const userSchema = Joi.object({ 
    
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email : Joi.string().email().required(),
})

// param schema
const schema = Joi.object({
    userId: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{24}$')).required(), 
})

// option schema
const optionSchema =  Joi.object({ 
    
    firstName: Joi.string(),
    lastName: Joi.string(),
    email : Joi.string().email(),
})

module.exports = {
    validateParam,
    schema,
    userSchema,
    optionSchema,
    deckSchema,
    validateBody
}

