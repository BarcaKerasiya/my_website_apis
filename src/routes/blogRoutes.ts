// src/routes/blogRoutes.ts
import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogController";
import { verifyToken } from "../middlewares/verifyToken";
const router = express.Router();

console.log("hii");
router.post("/blogs", createBlog);
router.delete("/blogs/:id", verifyToken, deleteBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", verifyToken, updateBlog);

export default router;
