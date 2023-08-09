import express from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tagController";

const router = express.Router();

router.post("/tags", createTag);
router.delete("/tags/:id", deleteTag);
router.get("/tags", getAllTags);
router.get("/tags/:id", getTagById);
router.put("/tags/:id", updateTag);

export default router;
