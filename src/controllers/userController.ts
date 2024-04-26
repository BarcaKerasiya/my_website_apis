// src/controllers/authorController.ts
import { Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

interface AuthenticatedRequest extends Request {
    userId?: string; // Define userId property
}

const userSchema = Joi.object({
    f_name: Joi.string().required().messages({
        'string.base': `'First name' should be a type of 'text'`,
        'string.empty': `First name cannot be an empty field`,
        'any.required': `First name is a required field`
      }),
    l_name: Joi.string().required().messages({
        'string.base': `Last name should be a type of 'text'`,
        'string.empty': `Last name cannot be an empty field`,
        'any.required': `Last name is a required field`
      }),
    email: Joi.string().email().required().messages({
        'string.base': `'Email' should be a type of 'email'`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`
      }),
    password: Joi.string().min(6).required().messages({
        'string.base': `'Password' should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.length':`Password must be 6 or more characters`,
        'any.required': `Password is a required field`
      })
})

export const createUser = async (req: Request, res: Response) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { f_name, l_name, email, password } = req.body;
        // console.log(name, status, jobTitle);
        const signin = await User.find({ email: email })
        console.log(signin, "hellooooo")
        if (signin.length > 0) {
            res
                .status(400)
                .json({ error: "Email already exists." });
        }
        else {
            const user = new User({
                f_name,
                l_name,
                email,
                password,
            });
            // console.log("author", author);

            const savedUser = await user.save();
            // console.log("savedAuthor", savedAuthor);

            // Generate JWt token 
            jwt.sign({ user}, 'your_secret_key', { expiresIn: '300s' }, (err: any, token) => {
                res.json({
                    token
                })
            }); // Change 'your_secret_key' to your actual secret key

            // res.status(201).json({user: savedUser, token});
        }
    } catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
    }
};

export const verifyToken = (req: Request, res: Response, next: any) => {

}
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


export const getUser = async (verifyToken: any, req: Request, res: Response) => {
    try{
        const { email, password} = req.body;
        const login = await User.find({ email : email})
        console.log(login, "okayyyyy")
        if(login.length === 1){
            if(login[0].password === password){
                res.status(200).json({
                    message: "Login Successfully!"
                })
            }
            else{
                res.status(400).json({
                    error: "Incorrect password."
                })
            }
        }
        else{
            res.status(400).json({
                error: "Invalid email, user not exists"
            })
        }
    }
    catch{
        res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
    }
}