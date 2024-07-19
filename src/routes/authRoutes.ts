import express from "express";
import {
  registerUser,
  authUser,
  refreshAccessToken,
  verifyEmail,
} from "../controllers/authController";
import { protect } from "../middlewares/auth";
import { asyncHandler } from "../middlewares/asyncErrorHandler";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));
router.get("/verify-email", asyncHandler(verifyEmail));
router.post("/login", asyncHandler(authUser));
router.post("/refresh-token", asyncHandler(refreshAccessToken));

export default router;
