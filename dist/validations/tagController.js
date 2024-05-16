"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/validayions/tagController.ts
const joi_1 = __importDefault(require("joi"));
const tagSchema = joi_1.default.object({
    tagName: joi_1.default.string().required().messages({
        'string.base': `Tag name should be a type of text`,
        'string.empty': 'Tag namw can not be an empty field',
        'any.required': 'Tag name is a required field'
    }),
    status: joi_1.default.string().required().messages({
        'string.base': `Status should be a type of text`,
        'string.empty': 'Status can not be an empty field',
        'any.required': 'Status is a required field'
    })
});
exports.default = tagSchema;
//# sourceMappingURL=tagController.js.map