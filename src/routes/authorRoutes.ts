// src/routes/authorRoutes.ts
import express from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "../controllers/authorController";

const router = express.Router();

router.post("/authors", createAuthor);
router.delete("/authors/:id", deleteAuthor);
router.get("/authors", getAllAuthors);
router.get("/authors/:id", getAuthorById);
router.put("/authors/:id", updateAuthor);

export default router;
