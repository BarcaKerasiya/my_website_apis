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
exports.conncetDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conncetDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGO_URL = process.env.MONGO_URI;
        yield mongoose_1.default.connect(MONGO_URL);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
});
exports.conncetDB = conncetDB;
//# sourceMappingURL=db.js.map