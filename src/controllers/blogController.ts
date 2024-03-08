import { Request, Response } from "express";
import Blog, { IBlog } from "../models/Blog";
import mongoose from "mongoose";

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
    console.log("up");
    const savedBlog = await blog.save();
    console.log("down", savedBlog);
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
  const { search_query } = req.query;
  try {
    // Define the type of the query object
    let query: { title?: RegExp } = {};
    if (typeof search_query === "string") {
      // Split the search query string by spaces
      const searchWords = search_query.split(" ");

      // Construct a regular expression to match each word individually
      const regexPatterns = searchWords.map((word) => `(?=.*${word})`);
      const regexString = regexPatterns.join("");

      // Create the regular expression
      query.title = new RegExp(regexString, "i");
    }

    console.log("query", query);
    const blogs = await Blog.find(query)
      .populate({
        path: "authorIds",
        select: "name jobTitle", // Populate only the 'name' field of the Author document
      })
      .populate({
        path: "tagIds",
        select: "tagName", // Populate only the 'tagName' field of the Tag document
      });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving blogs" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId)
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

    // Convert authorIds and tagIds to ObjectId instances
    // updatedData.authorIds = updatedData.authorIds.map((id: string) =>
    //   new mongoose.Types.ObjectId(id)
    // );
    // updatedData.tagIds = updatedData.tagIds.map((id: string) =>
    //   new mongoose.Types.ObjectId(id)
    // );
    // console.log("blogId", blogId);
    // console.log("updatedData", updatedData);
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
