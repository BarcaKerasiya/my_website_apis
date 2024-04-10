import express from "express";
import { contactMe } from "../controllers/contactMeController";

const router = express.Router();

router.post("/contact-me", contactMe);

export default router;
