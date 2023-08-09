"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authorRoutes.ts
const express_1 = __importDefault(require("express"));
const authorController_1 = require("../controllers/authorController");
const router = express_1.default.Router();
router.post("/authors", authorController_1.createAuthor);
router.delete("/authors/:id", authorController_1.deleteAuthor);
router.get("/authors", authorController_1.getAllAuthors);
router.get("/authors/:id", authorController_1.getAuthorById);
router.put("/authors/:id", authorController_1.updateAuthor);
exports.default = router;
//# sourceMappingURL=authorRoutes.js.map