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
exports.userServices = void 0;
const User_model_1 = require("./User.model");
const env_1 = require("../../config/env");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Password hash 
    if (payload.password) {
        const saltRounds = parseInt(env_1.envVars.BCRYPT_SALT_ROUND, 10);
        payload.password = yield bcryptjs_1.default.hash(payload.password, saltRounds);
    }
    const user = new User_model_1.User(payload);
    return yield user.save();
});
const updateUserStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.User.findByIdAndUpdate(id, { status }, { new: true });
});
exports.userServices = {
    createUser,
    //    getAllUsers,
    updateUserStatus,
};
