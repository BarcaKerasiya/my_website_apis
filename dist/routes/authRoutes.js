"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const asyncErrorHandler_1 = require("../middlewares/asyncErrorHandler");
const router = express_1.default.Router();
router.post("/register", (0, asyncErrorHandler_1.asyncHandler)(authController_1.registerUser));
router.get("/verify-email", (0, asyncErrorHandler_1.asyncHandler)(authController_1.verifyEmail));
router.post("/login", authController_1.authUser);
router.post("/refresh-token", authController_1.refreshAccessToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map