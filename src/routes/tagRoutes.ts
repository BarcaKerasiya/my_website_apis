import express from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tagController";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/tags",verifyToken, createTag);
router.delete("/tags/:id",verifyToken, deleteTag);
router.get("/tags",verifyToken, getAllTags);
router.get("/tags/:id",verifyToken, getTagById);
router.put("/tags/:id",verifyToken, updateTag);

export default router;
