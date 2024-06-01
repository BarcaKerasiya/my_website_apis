import express from "express";
import authorRoutes from "./authorRoutes";
import tagRoutes from "./tagRoutes";
import blogRoutes from "./blogRoutes";
import contactMeRoutes from "./contactMeRoutes";
import userRoutes from "./user";
import authRoutes from "./authRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/", authorRoutes);
router.use("/", tagRoutes);
router.use("/", blogRoutes);
router.use("/", userRoutes);
router.use("/", contactMeRoutes);

export default router;
