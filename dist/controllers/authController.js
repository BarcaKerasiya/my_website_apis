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
exports.refreshAccessToken = exports.authUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateTokens_1 = require("../utils/generateTokens");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { f_name, l_name, email, password } = req.body;
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = yield User_1.default.create({
        f_name,
        l_name,
        email,
        password,
    });
    if (user) {
        const accessToken = (0, generateTokens_1.generateAccessToken)(user._id);
        const refreshToken = (0, generateTokens_1.generateRefreshToken)(user._id);
        res.cookie("accessToken", accessToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 15 * 60 * 1000 }));
        res.cookie("refreshToken", refreshToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 7 * 24 * 60 * 60 * 1000 }));
        res.status(201).json({
            _id: user._id,
            email: user.email,
            f_name: user.f_name,
            l_name: user.l_name,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
exports.registerUser = registerUser;
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (user && (yield user.matchPassword(password))) {
        const accessToken = (0, generateTokens_1.generateAccessToken)(user._id);
        const refreshToken = (0, generateTokens_1.generateRefreshToken)(user._id);
        res.cookie("accessToken", accessToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 15 * 60 * 1000 }));
        res.cookie("refreshToken", refreshToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 7 * 24 * 60 * 60 * 1000 }));
        res.json({
            _id: user._id,
            email: user.email,
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});
exports.authUser = authUser;
const refreshAccessToken = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(401);
        throw new Error("No token provided");
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            res.status(403);
            throw new Error("Invalid token");
        }
        const accessToken = (0, generateTokens_1.generateAccessToken)(decoded.id);
        res.cookie("accessToken", accessToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 15 * 60 * 1000 }));
        res.json({ accessToken });
    });
};
exports.refreshAccessToken = refreshAccessToken;
//# sourceMappingURL=authController.js.map