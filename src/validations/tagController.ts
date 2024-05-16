// src/validayions/tagController.ts
import Joi from "joi";

const tagSchema = Joi.object({
   tagName: Joi.string().required().messages({
      'string.base': `Tag name should be a type of text`,
      'string.empty': 'Tag namw can not be an empty field',
      'any.required': 'Tag name is a required field'
   }),
   status: Joi.string().required().messages({
      'string.base': `Status should be a type of text`,
      'string.empty': 'Status can not be an empty field',
      'any.required': 'Status is a required field'
   })
})

export default tagSchema;