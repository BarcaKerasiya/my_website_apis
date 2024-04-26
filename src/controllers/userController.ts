// src/controllers/authorController.ts
import { Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import userSchema from "../validations/user";


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

            
        }
    } catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
    }
};

export const verifyToken = (req: Request, res: Response, next: any) => {
    // const bearerHeader = req.headers['Authorization'];
    // if(typeof bearerHeader !== 'undefined'){

    // }else{
    //     res.send({
    //         result:'token is not valid'
    //     })
    // }
}


export const getUser = async ( req: Request, res: Response) => {
    try{
        const { email, password} = req.body;
        const login = await User.find({ email : email})
        console.log(login, "okayyyyy")
        if(login.length === 1){
            if(login[0].password === password){
                const token = jwt.sign({ email}, 'your_secret_key', { expiresIn: '300s' });
                res.status(200).json({
                    message: "Login Successfully!",
                    token
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
        const user = {
            email,
            password
        }
        jwt.sign({ user}, 'your_secret_key', { expiresIn: '300s' }, (err: any, token) => {
            res.json({
                token
            })
        });
    }
    catch{
        res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
    }
}