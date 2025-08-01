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
exports.AdminControllers = void 0;
const admin_service_1 = require("./admin.service");
const approveDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.params.id;
        const driver = yield admin_service_1.adminServices.approveDriver(driverId);
        res.status(200).json({ success: true, data: driver });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
const suspendDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.params.id;
        const driver = yield admin_service_1.adminServices.suspendDriver(driverId);
        res.status(200).json({ success: true, data: driver });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield admin_service_1.adminServices.blockUser(userId);
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
const unblockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield admin_service_1.adminServices.unblockUser(userId);
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield admin_service_1.adminServices.getAllUsers();
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
const getAllDrivers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drivers = yield admin_service_1.adminServices.getAllDrivers();
        res.status(200).json({ success: true, data: drivers });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
const getAllRiders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const riders = yield admin_service_1.adminServices.getAllRiders();
        res.status(200).json({ success: true, data: riders });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
const getAllRides = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rides = yield admin_service_1.adminServices.getAllRides();
        res.status(200).json({ success: true, data: rides });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.AdminControllers = {
    approveDriver,
    suspendDriver,
    blockUser,
    unblockUser,
    getAllDrivers,
    getAllRides,
    getAllUsers,
    getAllRiders,
};
