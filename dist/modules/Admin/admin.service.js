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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const ride_model_1 = require("../Ride/ride.model");
const User_model_1 = require("../user/User.model");
const approveDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield User_model_1.User.findById(driverId);
    if (!driver)
        throw new Error("Driver not found");
    if (driver.role !== "driver")
        throw new Error("User is not a driver");
    driver.approved = true;
    driver.status = "active";
    return yield driver.save();
});
const suspendDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield User_model_1.User.findById(driverId);
    if (!driver)
        throw new Error("Driver not found");
    if (driver.role !== "driver")
        throw new Error("User is not a driver");
    driver.status = "suspended";
    return yield driver.save();
});
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findById(userId);
    if (!user)
        throw new Error("User not found");
    user.status = "blocked";
    return yield user.save();
});
const unblockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findById(userId);
    if (!user)
        throw new Error("User not found");
    user.status = "active";
    return yield user.save();
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.User.find();
});
const getAllDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.User.find({ role: "driver" });
});
const getAllRiders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.User.find({ role: "rider" });
});
const getAllRides = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ride_model_1.Ride.find();
});
exports.adminServices = {
    approveDriver,
    suspendDriver,
    blockUser,
    unblockUser,
    getAllUsers,
    getAllDrivers,
    getAllRides,
    getAllRiders,
};
