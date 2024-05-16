import express from "express";
import {
  contactMe,
  getAllContactData,
} from "../controllers/contactMeController";

const router = express.Router();

router.post("/contact-me", contactMe);
router.get("/contacts", getAllContactData);

export default router;
