// src/app.ts
import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authorRoutes from "./routes/authorRoutes";
import tagRoutes from "./routes/tagRoutes";
import blogRoutes from "./routes/blogRoutes";
import contactMeRoutes from "./routes/contactMeRoutes";
import userRoutes from "./routes/user";
import cors from "cors";
// console.log("I'm in");
const app = express();
// Middleware
app.use(express.json());
// app.use(express.)
app.use(cors({ origin: "*" }));
// http://localhost:3000/api/authors

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});
app.use("/api", authorRoutes);
app.use("/api", tagRoutes);
app.use("/api", blogRoutes);
app.use("/api", contactMeRoutes);
app.use("/api", userRoutes);
// Connect to MongoDB
const conncetDB = async () => {
  try {
    const MONGO_URL = `mongodb+srv://BlueMarron:${process.env.MONGO_PASSWORD}@bluemarron.496xb.mongodb.net/my_website?retryWrites=true&w=majority`;

    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
conncetDB();

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
