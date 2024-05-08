"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tagController_1 = require("../controllers/tagController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
router.post("/tags", verifyToken_1.verifyToken, tagController_1.createTag);
router.delete("/tags/:id", verifyToken_1.verifyToken, tagController_1.deleteTag);
router.get("/tags", verifyToken_1.verifyToken, tagController_1.getAllTags);
router.get("/tags/:id", verifyToken_1.verifyToken, tagController_1.getTagById);
router.put("/tags/:id", verifyToken_1.verifyToken, tagController_1.updateTag);
exports.default = router;
//# sourceMappingURL=tagRoutes.js.map