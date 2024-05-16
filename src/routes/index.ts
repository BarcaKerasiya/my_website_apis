import express, { Router } from "express";
import authorRoutes from "./authorRoutes";
import tagRoutes from "./tagRoutes";
import blogRoutes from "./blogRoutes";
import contactMeRoutes from "./contactMeRoutes";
import userRoutes from "./user";

const router = express.Router();

router.use("/authors", authorRoutes);
router.use("/tags", tagRoutes);
router.use("/blogs", blogRoutes);
router.use("/users", userRoutes);
router.use("/contact", contactMeRoutes);

export default router;
