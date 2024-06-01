"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const authorRoutes_1 = __importDefault(require("./authorRoutes"));
const tagRoutes_1 = __importDefault(require("./tagRoutes"));
const blogRoutes_1 = __importDefault(require("./blogRoutes"));
const contactMeRoutes_1 = __importDefault(require("./contactMeRoutes"));
const user_1 = __importDefault(require("./user"));
const router = express_1.default.Router();
router.use("/auth", authRoutes_1.default);
router.use("/", authorRoutes_1.default);
router.use("/", tagRoutes_1.default);
router.use("/", blogRoutes_1.default);
router.use("/", user_1.default);
router.use("/", contactMeRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map