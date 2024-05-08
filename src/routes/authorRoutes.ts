// src/routes/authorRoutes.ts
import express from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "../controllers/authorController";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/authors",verifyToken, createAuthor);
router.delete("/authors/:id",verifyToken, deleteAuthor);
router.get("/authors",verifyToken, getAllAuthors);
router.get("/authors/:id",verifyToken, getAuthorById);
router.put("/authors/:id",verifyToken, updateAuthor);

export default router;
