"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const refreshTokenHeader = req.headers['x-refresh-token'];
    if (bearerHeader && refreshTokenHeader && typeof refreshTokenHeader === 'string') {
        const bearer = bearerHeader.split(" ");
        const accessToken = bearer[1];
        const refreshToken = refreshTokenHeader;
        // Verify access token
        jsonwebtoken_1.default.verify(accessToken, 'Access_secret_key', (err, decodedAccessToken) => {
            if (err) {
                // If access token is invalid or expired, verify the refresh token
                jsonwebtoken_1.default.verify(refreshToken, 'refresh_secret_key', (err, decodedRefreshToken) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Invalid or expired refresh token'
                        });
                    }
                    else {
                        // If refresh token is valid, generate a new access token
                        const newAccessToken = jsonwebtoken_1.default.sign({ email: decodedRefreshToken.email }, 'your_access_secret_key', { expiresIn: '300s' });
                        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                        req.token = newAccessToken; // Update the request token
                        req.user = decodedRefreshToken; // Attach decodedRefreshToken to request
                        next();
                    }
                });
            }
            else {
                // If access token is valid
                req.token = accessToken;
                req.user = decodedAccessToken;
                next();
            }
        });
    }
    else {
        res.status(401).json({
            message: 'Access token and refresh token are required'
        });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map