"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/blogRoutes.ts
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const router = express_1.default.Router();
router.post("/blogs", blogController_1.createBlog);
router.delete("/blogs/:id", blogController_1.deleteBlog);
router.get("/blogs", blogController_1.getAllBlogs);
router.get("/blogs/:id", blogController_1.getBlogById);
router.put("/blogs/:id", blogController_1.updateBlog);
exports.default = router;
//# sourceMappingURL=blogRoutes.js.map