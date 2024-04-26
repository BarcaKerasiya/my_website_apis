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
exports.getUser = exports.verifyToken = exports.createUser = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const userSchema = joi_1.default.object({
    f_name: joi_1.default.string().required().messages({
        'string.base': `'First name' should be a type of 'text'`,
        'string.empty': `First name cannot be an empty field`,
        'any.required': `First name is a required field`
    }),
    l_name: joi_1.default.string().required().messages({
        'string.base': `Last name should be a type of 'text'`,
        'string.empty': `Last name cannot be an empty field`,
        'any.required': `Last name is a required field`
    }),
    email: joi_1.default.string().email().required().messages({
        'string.base': `'Email' should be a type of 'email'`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.base': `'Password' should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.length': `Password must be 6 or more characters`,
        'any.required': `Password is a required field`
    })
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = userSchema.validate(req.body);
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
            // Generate JWt token 
            jsonwebtoken_1.default.sign({ user }, 'your_secret_key', { expiresIn: '300s' }, (err, token) => {
                res.json({
                    token
                });
            }); // Change 'your_secret_key' to your actual secret key
            // res.status(201).json({user: savedUser, token});
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
    }
});
exports.createUser = createUser;
const verifyToken = (req, res, next) => {
};
exports.verifyToken = verifyToken;
// export const verifyToken = (req: Request, res:Response, next: Function) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }
//     jwt.verify(token, 'your_secret_key', (err: any, decoded:any) => {
//         if (err) {
//             return res.status(401).json({ error: "Unauthorized: Invalid token" });
//         }
//         // req.userId = decoded.userId; // Store decoded userId in request object for further use
//         const authenticatedReq = req as AuthenticatedRequest;
//         authenticatedReq.userId = decoded.userId; // Store decoded userId in request object for further use
//         next();
//     });
// };
const getUser = (verifyToken, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const login = yield User_1.default.find({ email: email });
        console.log(login, "okayyyyy");
        if (login.length === 1) {
            if (login[0].password === password) {
                res.status(200).json({
                    message: "Login Successfully!"
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