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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("./user.service");
const env_1 = require("../../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setAuthToken_1 = require("../../utils/setAuthToken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_model_1 = require("./User.model");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.userServices.createUser(req.body);
        // token generate
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.envVars.JWT_ACCESS_SECRET, { expiresIn: env_1.envVars.JWT_ACCESS_EXPIRES });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.envVars.JWT_REFRESH_SECRET, { expiresIn: env_1.envVars.JWT_REFRESH_EXPIRES });
        // set cookie
        (0, setAuthToken_1.setAuthCookie)(res, { accessToken, refreshToken });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: "User created successfully",
            data: { accessToken, user }
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Failed to create user",
            error,
        });
    }
});
const updateUserStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const updated = yield user_service_1.userServices.updateUserStatus(id, status);
    res.json({ success: true, data: updated });
});
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization || req.cookies.accessToken;
    if (!token) {
        res.status(401).json({
            success: false,
            message: "No token found, please login first",
        });
    }
    try {
        // Decode and verify the JWT token
        const decodedToken = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
        // Retrieve user info from the decoded token's ID
        const result = yield user_service_1.userServices.getMe(decodedToken.id);
        // Return the user data
        return res.status(200).json({
            success: true,
            message: "Your profile retrieved successfully",
            data: result.data,
        });
    }
    catch (error) {
        // Handle errors (e.g., token invalid/expired)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { oldPassword, newPassword } = _a, updateData = __rest(_a, ["oldPassword", "newPassword"]); // destructure
    const token = req.cookies.accessToken || req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
    try {
        // DB থেকে ইউজার বের করো
        const user = yield User_model_1.User.findById(decodedToken.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // যদি password update করতে চায়
        if (newPassword) {
            // old password check
            const isMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }
            // নতুন password hash করে দাও
            const saltRounds = parseInt(env_1.envVars.BCRYPT_SALT_ROUND, 10);
            updateData.password = yield bcryptjs_1.default.hash(newPassword, saltRounds);
        }
        // Update user
        const updatedUser = yield user_service_1.userServices.updateUserService(decodedToken.id, updateData);
        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
const updateSOSContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const SOSContacts = req.body;
    const token = req.cookies.accessToken || req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
    try {
        // DB থেকে ইউজার বের করো
        const user = yield User_model_1.User.findById(decodedToken.id);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update user SOS
        const updatedUser = yield user_service_1.userServices.updateSOSContacts(decodedToken.id, SOSContacts);
        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Trigger SOS during active ride
const triggerSOS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken || req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
    try {
        const userId = decodedToken.id;
        const { rideId, location } = req.body; // location: {lat, lng}
        const result = yield user_service_1.userServices.triggerSOS(userId, rideId, location);
        res.status(200).json({ success: true, message: result });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// Get user SOS info
const getSOSInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken || req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
    try {
        const userId = decodedToken.id;
        const sosInfo = yield user_service_1.userServices.getSOSInfo(userId);
        res.status(200).json({ success: true, data: sosInfo });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.UserControllers = {
    createUser,
    getMe,
    updateUserStatus,
    updateUser,
    updateSOSContacts,
    getSOSInfo,
    triggerSOS
};
