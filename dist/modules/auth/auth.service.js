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
exports.authServices = void 0;
const env_1 = require("../../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../user/User.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findOne({ email });
    const registerdRole = user === null || user === void 0 ? void 0 : user.role;
    if (!user)
        throw new Error("user does not exist, please sign up first");
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid password");
    if (registerdRole != role) {
        throw new Error(`you are not ${role}`);
    }
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.envVars.JWT_ACCESS_SECRET, { expiresIn: env_1.envVars.JWT_ACCESS_EXPIRES });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.envVars.JWT_REFRESH_SECRET, { expiresIn: env_1.envVars.JWT_REFRESH_EXPIRES });
    return { user, accessToken, refreshToken };
});
exports.authServices = {
    login
};
