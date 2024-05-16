"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/validations/blog.ts
const joi_1 = __importDefault(require("joi"));
const blogSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        'string.base': 'Title should be a type of text',
        'string.empty': 'Title cannot be an empty field',
        'any.required': 'Title is a required field'
    }),
    content: joi_1.default.string().required().messages({
        'string.base': 'content should be a type of text',
        'string.empty': 'Content cannot be an empty field',
        'any.required': 'Content is a required field'
    }),
    thumbnail: joi_1.default.string().required().messages({
        'string.base': 'Thumbnail should be a type of text',
        'string.empty': 'Thumbnail cannot be an empty field',
        'any.required': 'Thmbnail is a required field'
    }),
    authorIds: joi_1.default.string().required().messages({
        'string.base': 'Author Id should be a type of text',
        'string.empty': 'Author Id cannot be an empty field',
        'any.required': 'Author Id is a required field'
    }),
    tagIds: joi_1.default.string().required().messages({
        'string.base': 'Tag Id should be a type of text',
        'string.empty': 'Tag Id cannot be an empty field',
        'any.required': 'Tag Id is a required field'
    }),
    minutesToRead: joi_1.default.number().required().messages({
        'number.base': `Minutes to read should be a type of number`,
        'any.required': `Minutes to read is a required field`
    })
});
exports.default = blogSchema;
//# sourceMappingURL=blog.js.map