"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeDriver = exports.authorizeRider = exports.authorizeAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authenticate = (req, res, next) => {
    const token = req.headers.authorization || req.cookies.accessToken;
    if (!token)
        return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    }
    catch (_a) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
const authorizeAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
// Rider-only middleware
const authorizeRider = (req, res, next) => {
    var _a, _b;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "rider" && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== "admin") {
        return res.status(403).json({ message: "Forbidden: Riders only" });
    }
    next();
};
exports.authorizeRider = authorizeRider;
// Driver-only middleware
const authorizeDriver = (req, res, next) => {
    var _a, _b;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "driver" && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== "admin") {
        return res.status(403).json({ message: "Forbidden: Drivers only" });
    }
    next();
};
exports.authorizeDriver = authorizeDriver;
