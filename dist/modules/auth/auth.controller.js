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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
const setAuthToken_1 = require("../../utils/setAuthToken");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { user, accessToken, refreshToken } = yield auth_service_1.authServices.login(email, password);
        (0, setAuthToken_1.setAuthCookie)(res, { accessToken, refreshToken });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                accessToken,
                user
            }
        });
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message || "Login failed",
        });
    }
});
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        res.status(200).json({
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "loged out successful",
            data: null,
        });
    }
    catch (error) {
        // console.error("Login Error:", error);
        next(error);
    }
});
exports.AuthControllers = {
    loginUser,
    logout
};
