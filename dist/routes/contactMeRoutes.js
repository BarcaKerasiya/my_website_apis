"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactMeController_1 = require("../controllers/contactMeController");
const router = express_1.default.Router();
router.post("/contact-me", contactMeController_1.contactMe);
exports.default = router;
//# sourceMappingURL=contactMeRoutes.js.map