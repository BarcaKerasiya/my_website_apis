// src/app.ts
import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authorRoutes from "./routes/authorRoutes";
import tagRoutes from "./routes/tagRoutes";
import blogRoutes from "./routes/blogRoutes";
import contactMeRoutes from "./routes/contactMeRoutes";
import cors from "cors";
import path from "path";
// import video from "./assets/myvideo.mp4";
// console.log("I'm in");
const app = express();
// Middleware
app.use(express.json());
// app.use(express.)
app.use(cors({ origin: "*" }));
// List of allowed origins
// const allowedOrigins = [
//   "https://vishnukerasiya.com", // Production frontend
//   "http://localhost:5173", // Local development frontend (adjust port if needed)
// ];

// // Middleware to allow multiple origins
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.includes(origin) || !origin) {
//         // Allow requests with no origin (like Postman)
//         callback(null, true);
//       } else {
//         // Reject requests from disallowed origins
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    'autoplay=(self "http://localhost:5173" "https://vishnukerasiya.com")'
  );
  next();
});

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/api/video", (req: Request, res: Response) => {
  const videoPath = path.join(__dirname, "assets", "myvideo.mp4");

  res.sendFile(videoPath, (err) => {
    if (err) {
      // Log the error for debugging
      console.error("Error sending video file:", err);

      // Respond with an error only if headers haven't been sent
      if (!res.headersSent) {
        res.status(500).send("Unable to load video.");
      }
    }
  });
});
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
