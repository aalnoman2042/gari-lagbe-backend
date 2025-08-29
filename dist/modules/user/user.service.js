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
const updateUserStatus = (_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.User.findByIdAndUpdate(_id, { status }, { new: true });
});
const getMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id);
    const user = yield User_model_1.User.findById(id).select("-password");
    return {
        data: user
    };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUserService = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find user by ID and update with new data
        const updatedUser = yield User_model_1.User.findByIdAndUpdate(userId, updateData, { new: true });
        return {
            data: updatedUser
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        throw new Error('Error updating user: ');
    }
});
// Update SOS contacts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSOSContacts = (userId, sosData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(sosData);
    const user = yield User_model_1.User.findById(userId);
    if (!user)
        throw new Error("User not found");
    if (sosData.enableSOS !== undefined)
        user.enableSOS = sosData.enableSOS;
    if (sosData.emergencyContacts)
        user.emergencyContacts = sosData.emergencyContacts;
    yield user.save();
    return user;
});
// Trigger SOS
// const triggerSOS= async (userId: string, rideId: string, location: { lat: number; lng: number }) => {
//   const user = await User.findById(userId);
//   if (!user) throw new Error("User not found");
//   if (!user.enableSOS) throw new Error("SOS is not enabled for this user");
//   // Here you can integrate:
//   // 1. emailjs / nodemailer for email
//   // 2. twilio / whatsapp-web.js for SMS/WhatsApp
//   // 3. send GPS link in message
//   // 4. log to DB if needed
//   // For now just a placeholder
//   console.log("SOS Triggered!", { userId, rideId, location, contacts: user.emergencyContacts });
//   return "Emergency contact notified successfully";
// }
// Get SOS info
const getSOSInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findById(userId);
    if (!user)
        throw new Error("User not found");
    return {
        enableSOS: user.enableSOS,
        emergencyContacts: user.emergencyContacts || [],
    };
});
exports.userServices = {
    createUser,
    getMe,
    updateUserStatus,
    updateUserService,
    getSOSInfo,
    updateSOSContacts,
    // triggerSOS
};
