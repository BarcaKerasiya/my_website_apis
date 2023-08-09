import { Request, Response } from "express";
import Tag, { Itag } from "../models/Tag";

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name, status } = req.body;
    const tag = new Tag({
      name,
      status,
    });
    const savedTag = await tag.save();
    res.status(201).json(savedTag);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the tag." });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const tagId = req.params.id;
    const deletedTag = await Tag.findByIdAndDelete(tagId);

    if (!deletedTag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(204).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the tag" });
  }
};

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving tags" });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findById(tagId);

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the tag" });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    const tagId = req.params.id;
    const updatedData: Partial<Itag> = req.body; // Only update the provided fields

    const updatedTag = await Tag.findByIdAndUpdate(tagId, updatedData, {
      new: true, // Return the updated document
    });

    if (!updatedTag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the tag" });
  }
};
