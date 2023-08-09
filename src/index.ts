// src/app.ts
import { config } from "dotenv";
config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authorRoutes from "./routes/authorRoutes";
import cors from "cors";

const app = express();
console.log("hiii");
// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/api", authorRoutes);

// Connect to MongoDB
const conncetDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
conncetDB();
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
