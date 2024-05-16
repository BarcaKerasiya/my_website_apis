"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorRoutes_1 = __importDefault(require("./authorRoutes"));
const tagRoutes_1 = __importDefault(require("./tagRoutes"));
const blogRoutes_1 = __importDefault(require("./blogRoutes"));
const contactMeRoutes_1 = __importDefault(require("./contactMeRoutes"));
const user_1 = __importDefault(require("./user"));
const router = express_1.default.Router();
router.use("/authors", authorRoutes_1.default);
router.use("/tags", tagRoutes_1.default);
router.use("/blogs", blogRoutes_1.default);
router.use("/users", user_1.default);
router.use("/contact", contactMeRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map