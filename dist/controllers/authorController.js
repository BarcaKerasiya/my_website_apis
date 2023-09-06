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
exports.updateAuthor = exports.getAuthorById = exports.getAllAuthors = exports.deleteAuthor = exports.createAuthor = void 0;
const Author_1 = __importDefault(require("../models/Author"));
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, status, jobTitle } = req.body;
        console.log(name, status, jobTitle);
        const author = new Author_1.default({
            name,
            status,
            jobTitle,
        });
        const savedAuthor = yield author.save();
        res.status(201).json(savedAuthor);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the author." });
    }
});
exports.createAuthor = createAuthor;
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = req.params.id;
        const deletedAuthor = yield Author_1.default.findByIdAndDelete(authorId);
        if (!deletedAuthor) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.status(204).json({ message: "Author deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while deleting the author" });
    }
});
exports.deleteAuthor = deleteAuthor;
const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield Author_1.default.find();
        res.status(200).json(authors);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while retrieving authors" });
    }
});
exports.getAllAuthors = getAllAuthors;
const getAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = req.params.id;
        const author = yield Author_1.default.findById(authorId);
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.status(200).json(author);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while retrieving the author" });
    }
});
exports.getAuthorById = getAuthorById;
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = req.params.id;
        const updatedData = req.body; // Only update the provided fields
        const updatedAuthor = yield Author_1.default.findByIdAndUpdate(authorId, updatedData, {
            new: true, // Return the updated document
        });
        if (!updatedAuthor) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.status(200).json(updatedAuthor);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while updating the author" });
    }
});
exports.updateAuthor = updateAuthor;
//# sourceMappingURL=authorController.js.map