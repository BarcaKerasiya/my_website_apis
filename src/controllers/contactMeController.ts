// src/controllers/authorController.ts
import { Request, Response } from "express";
import ContactMe, { IContact } from "../models/ContactMe";

export const contactMe = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const messageQuery = new ContactMe({
      name,
      email,
      message,
    });
    // console.log("author", author);
    const savedMessage = await messageQuery.save();
    // console.log("savedAuthor", savedAuthor);
    res.status(201).json(savedMessage);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the author." });
  }
};
