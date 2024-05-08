"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader !== null && typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
        console.log("working...");
    }
    else {
        res.status(401).json({
            result: 'token is not valid'
        });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map