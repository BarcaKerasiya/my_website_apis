"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/blogRoutes.ts
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
console.log("hii");
router.post("/blogs", verifyToken_1.verifyToken, blogController_1.createBlog);
router.delete("/blogs/:id", verifyToken_1.verifyToken, blogController_1.deleteBlog);
router.get("/blogs", verifyToken_1.verifyToken, blogController_1.getAllBlogs);
router.get("/blogs/:id", verifyToken_1.verifyToken, blogController_1.getBlogById);
router.put("/blogs/:id", verifyToken_1.verifyToken, blogController_1.updateBlog);
exports.default = router;
//# sourceMappingURL=blogRoutes.js.map