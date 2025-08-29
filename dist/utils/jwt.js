"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
// import envVars from "./envVars"; // Ensure you import the JWT secret key from the environment variables
const jwtAuthMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided, please login",
        });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
        req.user = decodedToken; // Attach the decoded token (user info) to req.user
        next(); // Call the next middleware or route handler
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
exports.default = jwtAuthMiddleware;
