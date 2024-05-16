// src/validations/user.ts
import Joi from "joi";

const userSchema = Joi.object({
    f_name: Joi.string().required().messages({
        'string.base': `'First name' should be a type of 'text'`,
        'string.empty': `First name cannot be an empty field`,
        'any.required': `First name is a required field`
      }),
    l_name: Joi.string().required().messages({
        'string.base': `Last name should be a type of 'text'`,
        'string.empty': `Last name cannot be an empty field`,
        'any.required': `Last name is a required field`
      }),
    email: Joi.string().email().required().messages({
        'string.base': `'Email' should be a type of 'email'`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`
      }),
    password: Joi.string().min(6).required().messages({
        'string.base': `'Password' should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.length':`Password must be 6 or more characters`,
        'any.required': `Password is a required field`
      })
})

export default userSchema