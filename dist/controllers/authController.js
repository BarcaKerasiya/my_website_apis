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
exports.verifyEmail = exports.refreshAccessToken = exports.authUser = exports.registerUserBackup = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateTokens_1 = require("../utils/generateTokens");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../validations/user"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // // Validate input data
        console.log("req.body", req.body);
        const { error } = user_1.default.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }
        const { name, email, password } = req.body;
        // Check if user already exists
        const userExists = yield User_1.default.findOne({ email });
        // Create a new user
        let userData;
        if (!userExists) {
            userData = yield User_1.default.create({
                name,
                email,
                password,
                isVerified: false,
            });
        }
        const user = userExists ? userExists : userData;
        const emailVerificationToken = generateEmailVerificationToken(user._id);
        yield sendVerificationEmail(user, emailVerificationToken);
        res.status(201).json({
            message: "Registration successful. Please check your email to verify your account.",
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.registerUser = registerUser;
const registerUserBackup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // // Validate input data
        const { error } = user_1.default.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }
        const { name, email, password } = req.body;
        // Check if user already exists
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }
        // Create a new user
        const user = yield User_1.default.create({
            name,
            email,
            password,
            isVerified: false,
        });
        if (user) {
            // Generate tokens
            const accessToken = (0, generateTokens_1.generateAccessToken)(user._id);
            const refreshToken = (0, generateTokens_1.generateRefreshToken)(user._id);
            // Set cookies
            res.cookie("accessToken", accessToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 15 * 60 * 1000 }));
            res.cookie("refreshToken", refreshToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 7 * 24 * 60 * 60 * 1000 }));
            // Send response
            res.status(201).json({
                _id: user._id,
                email: user.email,
                name: user.name,
            });
        }
        else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.registerUserBackup = registerUserBackup;
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
const sendVerificationEmail = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Email Verification",
        html: `<p>Hi ${user.name},</p>
           <p>Please click the link below to verify your email address:</p>
           <a href="${verificationUrl}">Verify Email</a>
           <p>If you did not request this, please ignore this email.</p>`,
    };
    yield transporter.sendMail(mailOptions);
});
const generateEmailVerificationToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.EMAIL_VERIFICATION_SECRET, {
        expiresIn: "1h",
    });
};
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        console.log("token", token);
        if (typeof token !== "string") {
            res.status(400);
            throw new Error("No token provided or invalid token format");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
        console.log("decoded", decoded);
        const user = yield User_1.default.findById(decoded.userId);
        console.log("user", user);
        if (!user) {
            res.status(400);
            throw new Error("Invalid token");
        }
        if (user.isVerified) {
            res.status(400);
            throw new Error("User already verified");
        }
        user.isVerified = true;
        yield user.save();
        const accessToken = (0, generateTokens_1.generateAccessToken)(user._id);
        const refreshToken = (0, generateTokens_1.generateRefreshToken)(user._id);
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        };
        res.cookie("accessToken", accessToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 15 * 60 * 1000 }));
        res.cookie("refreshToken", refreshToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 7 * 24 * 60 * 60 * 1000 }));
        res.status(200).json({ message: "Email verified successfully" });
    }
    catch (err) {
        console.log("catch innn", err);
        next(err);
    }
});
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=authController.js.map