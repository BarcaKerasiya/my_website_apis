// src/controllers/authorController.ts
import { Request, Response } from "express";
import Author, { IAuthor } from "../models/Author";

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, status, jobTitle } = req.body;
    // console.log(name, status, jobTitle);
    const author = new Author({
      name,
      status,
      jobTitle,
    });
    // console.log("author", author);
    const savedAuthor = await author.save();
    // console.log("savedAuthor", savedAuthor);
    res.status(201).json(savedAuthor);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the author." });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;
    const deletedAuthor = await Author.findByIdAndDelete(authorId);
    console.log("deletedAuthor", deletedAuthor);

    if (!deletedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }

    return res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the author" });
  }
};

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving authors" });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findById(authorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the author" });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;
    const updatedData: Partial<IAuthor> = req.body; // Only update the provided fields

    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      updatedData,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the author" });
  }
};
