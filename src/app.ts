// src/app.ts
import { config } from "dotenv";
config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authorRoutes from "./routes/authorRoutes";

const app = express();

// Middleware
app.use(bodyParser.json());

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
