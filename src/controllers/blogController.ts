import { Request, Response } from "express";
import Blog, { IBlog } from "../models/Blog";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, thumbnail, authorIds, tagIds, minutesToRead } =
      req.body;
    const blog = new Blog({
      title,
      content,
      thumbnail,
      authorIds,
      tagIds,
      minutesToRead,
    });
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the blog." });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(204).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the blog" });
  }
};
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving blogs" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the blog" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const updatedData: Partial<IBlog> = req.body; // Only update the provided fields

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, {
      new: true, // Return the updated document
    });

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the blog" });
  }
};
