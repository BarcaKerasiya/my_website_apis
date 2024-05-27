import express from "express";
import {
  registerUser,
  authUser,
  refreshAccessToken,
} from "../controllers/authController";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
