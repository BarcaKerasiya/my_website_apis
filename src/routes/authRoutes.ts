import express, { NextFunction, Request, Response } from "express";
import {
  registerUser,
  authUser,
  refreshAccessToken,
} from "../controllers/authController";
import { protect } from "../middlewares/auth";
import { asyncHandler } from "../middlewares/asyncErrorHandler";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", authUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
