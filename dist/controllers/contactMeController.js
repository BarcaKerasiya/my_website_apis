"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContactData = exports.contactMe = void 0;
const ContactMe_1 = __importDefault(require("../models/ContactMe"));
const contactMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message } = req.body;
        const messageQuery = new ContactMe_1.default({
            name,
            email,
            message,
        });
        // console.log("author", author);
        const savedMessage = yield messageQuery.save();
        // console.log("savedAuthor", savedAuthor);
        res.status(201).json(savedMessage);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the author." });
    }
});
exports.contactMe = contactMe;
const getAllContactData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield ContactMe_1.default.find();
        res.status(200).json(tags);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving tags" });
    }
});
exports.getAllContactData = getAllContactData;
//# sourceMappingURL=contactMeController.js.map