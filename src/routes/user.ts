import express from "express";
import {
  createUser,
  getUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/sign-up", createUser);
router.get("/login", getUser)

export default router;