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
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
// console.log("I'm in");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// app.use(express.)
app.use((0, cors_1.default)({ origin: "*" }));
// http://localhost:3000/api/authors
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
app.use("/api", user_1.default);
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