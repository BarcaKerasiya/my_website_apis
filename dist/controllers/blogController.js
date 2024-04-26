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
exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.deleteBlog = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, thumbnail, authorIds, tagIds, minutesToRead } = req.body;
        const blog = new Blog_1.default({
            title,
            content,
            thumbnail,
            authorIds,
            tagIds,
            minutesToRead,
            IPAddress: req.ip,
        });
        console.log("up");
        const savedBlog = yield blog.save();
        console.log("down", savedBlog);
        res.status(201).json(savedBlog);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ error: "An error occurred while creating the blog." });
    }
});
exports.createBlog = createBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const deletedBlog = yield Blog_1.default.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(204).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while deleting the blog" });
    }
});
exports.deleteBlog = deleteBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search_query } = req.query;
    try {
        // Define the type of the query object
        let query = {};
        if (typeof search_query === "string") {
            // Split the search query string by spaces
            const searchWords = search_query.split(" ");
            // Construct a regular expression to match each word individually
            const regexPatterns = searchWords.map((word) => `(?=.*${word})`);
            const regexString = regexPatterns.join("");
            // Create the regular expression
            query.title = new RegExp(regexString, "i");
        }
        const blogs = yield Blog_1.default.find(query)
            .sort({ createdAt: -1 })
            .populate({
            path: "authorIds",
            select: "name jobTitle", // Populate only the 'name' field of the Author document
        })
            .populate({
            path: "tagIds",
            select: "tagName", // Populate only the 'tagName' field of the Tag document
        });
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving blogs" });
    }
});
exports.getAllBlogs = getAllBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const blog = yield Blog_1.default.findById(blogId)
            .populate({
            path: "authorIds",
            select: "name jobTitle", // Populate only the 'name' field of the Author document
        })
            .populate({
            path: "tagIds",
            select: "tagName", // Populate only the 'tagName' field of the Tag document
        });
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json(blog);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while retrieving the blog" });
    }
});
exports.getBlogById = getBlogById;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const updatedData = req.body; // Only update the provided fields
        // Convert authorIds and tagIds to ObjectId instances
        // updatedData.authorIds = updatedData.authorIds.map((id: string) =>
        //   new mongoose.Types.ObjectId(id)
        // );
        // updatedData.tagIds = updatedData.tagIds.map((id: string) =>
        //   new mongoose.Types.ObjectId(id)
        // );
        // console.log("blogId", blogId);
        // console.log("updatedData", updatedData);
        const updatedBlog = yield Blog_1.default.findByIdAndUpdate(blogId, updatedData, {
            new: true, // Return the updated document
        });
        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while updating the blog" });
    }
});
exports.updateBlog = updateBlog;
//# sourceMappingURL=blogController.js.map