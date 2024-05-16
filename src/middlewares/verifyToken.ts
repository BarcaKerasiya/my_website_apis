import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

// Define a custom interface extending Request
interface CustomRequest extends Request {
    token?: string; // Define 'token' property
    user?: any;
}

// export const verifyToken = (req: CustomRequest, res: Response, next: any) => {
//     const bearerHeader = req.headers['authorization'];
//     if(bearerHeader !== null && typeof bearerHeader !== 'undefined'){
//         const bearer = bearerHeader.split(" ");
//         const token = bearer[1];
//         req.token = token;
//         next();
//         console.log("working...")
//     }else{
//         res.status(401).json({
//             result:'token is not valid'
//         })
//     }
// }


export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization'];
    const refreshTokenHeader = req.headers['x-refresh-token'];
    
    if (bearerHeader && refreshTokenHeader && typeof refreshTokenHeader === 'string') {
        const bearer = bearerHeader.split(" ");
        const accessToken = bearer[1];
        const refreshToken = refreshTokenHeader;

        // Verify access token
        jwt.verify(accessToken, 'Access_secret_key', (err: Error, decodedAccessToken: any) => {
            if (err) {
                // If access token is invalid or expired, verify the refresh token
                jwt.verify(refreshToken, 'refresh_secret_key', (err:Error, decodedRefreshToken: any) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Invalid or expired refresh token'
                        });
                    } else {
                        // If refresh token is valid, generate a new access token
                        const newAccessToken = jwt.sign({ email: decodedRefreshToken.email }, 'your_access_secret_key', { expiresIn: '300s' });
                        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                        req.token = newAccessToken; // Update the request token
                        req.user = decodedRefreshToken; // Attach decodedRefreshToken to request
                        next();
                    }
                });
            } else {
                // If access token is valid
                req.token = accessToken;
                req.user = decodedAccessToken;
                next();
            }
        });
    } else {
        res.status(401).json({
            message: 'Access token and refresh token are required'
        });
    }
};
