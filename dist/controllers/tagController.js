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
exports.updateTag = exports.getTagById = exports.getAllTags = exports.deleteTag = exports.createTag = void 0;
const Tag_1 = __importDefault(require("../models/Tag"));
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, status } = req.body;
        const tag = new Tag_1.default({
            name,
            status,
        });
        const savedTag = yield tag.save();
        res.status(201).json(savedTag);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the tag." });
    }
});
exports.createTag = createTag;
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = req.params.id;
        const deletedTag = yield Tag_1.default.findByIdAndDelete(tagId);
        if (!deletedTag) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.status(204).json({ message: "Tag deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the tag" });
    }
});
exports.deleteTag = deleteTag;
const getAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield Tag_1.default.find();
        res.status(200).json(tags);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving tags" });
    }
});
exports.getAllTags = getAllTags;
const getTagById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = req.params.id;
        const tag = yield Tag_1.default.findById(tagId);
        if (!tag) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.status(200).json(tag);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while retrieving the tag" });
    }
});
exports.getTagById = getTagById;
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = req.params.id;
        const updatedData = req.body; // Only update the provided fields
        const updatedTag = yield Tag_1.default.findByIdAndUpdate(tagId, updatedData, {
            new: true, // Return the updated document
        });
        if (!updatedTag) {
            return res.status(404).json({ error: "Tag not found" });
        }
        res.status(200).json(updatedTag);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while updating the tag" });
    }
});
exports.updateTag = updateTag;
//# sourceMappingURL=tagController.js.map