"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
// src/validations/authorController.ts
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    f_name: joi_1.default.string().required().messages({
        'string.base': `'First name' should be a type of 'text'`,
        'string.empty': `First name cannot be an empty field`,
        'any.required': `First name is a required field`
    }),
    l_name: joi_1.default.string().required().messages({
        'string.base': `Last name should be a type of 'text'`,
        'string.empty': `Last name cannot be an empty field`,
        'any.required': `Last name is a required field`
    }),
    email: joi_1.default.string().email().required().messages({
        'string.base': `'Email' should be a type of 'email'`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.base': `'Password' should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.length': `Password must be 6 or more characters`,
        'any.required': `Password is a required field`
    })
});
//# sourceMappingURL=userController.js.map