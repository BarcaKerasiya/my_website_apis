"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/validations/author.ts
const joi_1 = __importDefault(require("joi"));
const authorSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.base': `Name should be a type of text`,
        'string.empty': `Name cannot be an empty field`,
        'any.required': `Name is a required field`
    }),
    status: joi_1.default.string().required().messages({
        'string.base': `Status should be a type of text`,
        'string.empty': `Status cannot be an empty field`,
        'any.required': `Status is a required field`
    }),
    jobTitle: joi_1.default.string().required().messages({
        'string.base': `jobTitle should be a type of text`,
        'string.empty': `jobTitle cannot be an empty field`,
        'any.required': `jobTitle is a required field`
    }),
});
exports.default = authorSchema;
//# sourceMappingURL=author.js.map