// src/app.ts
import { config } from "dotenv";
config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authorRoutes from "./routes/authorRoutes";
import cors from "cors";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/api", authorRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
