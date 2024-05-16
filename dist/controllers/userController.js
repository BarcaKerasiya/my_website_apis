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
exports.getUser = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const user_1 = __importDefault(require("../validations/user"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = user_1.default.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { f_name, l_name, email, password } = req.body;
        // console.log(name, status, jobTitle);
        const signin = yield User_1.default.find({ email: email });
        console.log(signin, "hellooooo");
        if (signin.length > 0) {
            res
                .status(400)
                .json({ error: "Email already exists." });
        }
        else {
            const user = new User_1.default({
                f_name,
                l_name,
                email,
                password,
            });
            // console.log("author", author);
            const savedUser = yield user.save();
            // console.log("savedAuthor", savedAuthor);
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const login = yield User_1.default.find({ email: email });
        console.log(login, "okayyyyy");
        if (login.length === 1) {
            if (login[0].password === password) {
                // const token = jwt.sign({ email}, 'your_secret_key', { expiresIn: '300s' });
                const accessToken = jsonwebtoken_1.default.sign({ email }, 'Access_secret_key', { expiresIn: '1d' });
                const refreshToken = jsonwebtoken_1.default.sign({ email }, 'refresh_secret_key', { expiresIn: '10d' });
                res.status(200).json({
                    message: "Login Successfully!",
                    // token,
                    accessToken,
                    refreshToken
                });
            }
            else {
                res.status(400).json({
                    error: "Incorrect password."
                });
            }
        }
        else {
            res.status(400).json({
                error: "Invalid email, user not exists"
            });
        }
    }
    catch (_a) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
    }
});
exports.getUser = getUser;
//# sourceMappingURL=userController.js.map