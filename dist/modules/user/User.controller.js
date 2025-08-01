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
exports.UserControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("./user.service");
const env_1 = require("../../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setAuthToken_1 = require("../../utils/setAuthToken");
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
exports.UserControllers = {
    createUser,
    updateUserStatus,
};
