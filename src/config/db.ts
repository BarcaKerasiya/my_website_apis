import mongoose from "mongoose";

export const conncetDB = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
