import jwt from "jsonwebtoken";
import { Request, Response } from "express";

// Define a custom interface extending Request
interface CustomRequest extends Request {
    token?: string; // Define 'token' property
}

export const verifyToken = (req: CustomRequest, res: Response, next: any) => {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader !== null && typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
        console.log("working...")
    }else{
        res.status(401).json({
            result:'token is not valid'
        })
    }
}