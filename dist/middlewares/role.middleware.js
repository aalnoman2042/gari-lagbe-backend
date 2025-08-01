"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
// import { AuthRequest } from "./auth.middleware";
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
exports.authorize = authorize;
