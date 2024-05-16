// src/validations/author.ts
import Joi from "joi";

const authorSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': `Name should be a type of text`,
        'string.empty': `Name cannot be an empty field`,
        'any.required': `Name is a required field`
    }),
    status: Joi.string().required().messages({
        'string.base': `Status should be a type of text`,
        'string.empty': `Status cannot be an empty field`,
        'any.required': `Status is a required field`
    }),
    jobTitle: Joi.string().required().messages({
        'string.base': `jobTitle should be a type of text`,
        'string.empty': `jobTitle cannot be an empty field`,
        'any.required': `jobTitle is a required field`
    }),
})

export default authorSchema;