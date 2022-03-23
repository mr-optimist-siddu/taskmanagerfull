const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    email:
        Joi.string()
            .lowercase()
            .regex(/meltwater\.com$/)
            .required(),
    
    password:
        Joi.string()
            .min(8)
            .required(),
    
})

module.exports = { authSchema }