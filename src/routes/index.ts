import express, { Router } from "express";
import authorRoutes from "./authorRoutes";
import tagRoutes from "./tagRoutes";
import blogRoutes from "./blogRoutes";
import contactMeRoutes from "./contactMeRoutes";
import userRoutes from "./user";

const router = express.Router();

router.use("/", authorRoutes);
router.use("/", tagRoutes);
router.use("/", blogRoutes);
router.use("/", userRoutes);
router.use("/", contactMeRoutes);

export default router;
