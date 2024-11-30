"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authorRoutes_1 = __importDefault(require("./routes/authorRoutes"));
const tagRoutes_1 = __importDefault(require("./routes/tagRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const contactMeRoutes_1 = __importDefault(require("./routes/contactMeRoutes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// import video from "./assets/myvideo.mp4";
// console.log("I'm in");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// app.use(express.)
app.use((0, cors_1.default)({ origin: "*" }));
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
    res.setHeader("Permissions-Policy", 'autoplay=(self "http://localhost:5173" "https://vishnukerasiya.com")');
    next();
});
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/api/video", (req, res) => {
    const videoPath = path_1.default.join(__dirname, "assets", "myvideo.mp4");
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
app.get("/", (_req, res) => {
    return res.send("Express Typescript on Vercel");
});
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
app.use("/api", authorRoutes_1.default);
app.use("/api", tagRoutes_1.default);
app.use("/api", blogRoutes_1.default);
app.use("/api", contactMeRoutes_1.default);
// Connect to MongoDB
const conncetDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGO_URL = `mongodb+srv://BlueMarron:${process.env.MONGO_PASSWORD}@bluemarron.496xb.mongodb.net/my_website?retryWrites=true&w=majority`;
        yield mongoose_1.default.connect(MONGO_URL);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
});
conncetDB();
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map