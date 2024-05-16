// src/validations/blog.ts
import Joi from "joi";

const blogSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base':'Title should be a type of text',
        'string.empty':'Title cannot be an empty field',
        'any.required':'Title is a required field'
    }),
    content: Joi.string().required().messages({
        'string.base':'content should be a type of text',
        'string.empty':'Content cannot be an empty field',
        'any.required':'Content is a required field'
    }),
    thumbnail: Joi.string().required().messages({
        'string.base':'Thumbnail should be a type of text',
        'string.empty':'Thumbnail cannot be an empty field',
        'any.required':'Thmbnail is a required field'
    }),
    authorIds: Joi.string().required().messages({
        'string.base':'Author Id should be a type of text',
        'string.empty':'Author Id cannot be an empty field',
        'any.required':'Author Id is a required field'
    }),
    tagIds: Joi.string().required().messages({
        'string.base':'Tag Id should be a type of text',
        'string.empty':'Tag Id cannot be an empty field',
        'any.required':'Tag Id is a required field'
    }),
    minutesToRead: Joi.number().required().messages({
        'number.base': `Minutes to read should be a type of number`,
        'any.required': `Minutes to read is a required field`
    })
});

export default blogSchema;