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
exports.DriverControllers = void 0;
const driver_service_1 = require("./driver.service");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const ride_model_1 = require("../Ride/ride.model");
const updateAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { onlineStatus } = req.body;
        const driverId = req.params.id;
        const driver = yield driver_service_1.driverServices.updateAvailability(driverId, onlineStatus);
        res.status(200).json({ success: true, data: driver });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
const getDriverHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield driver_service_1.driverServices.getDriverHistory(req.params.driverId);
    res.json({ success: true, data: rides });
});
const getDriverEarnings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.params.driverId;
        const earnings = yield driver_service_1.driverServices.getDriverEarnings(driverId);
        res.status(200).json({ success: true, data: earnings });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
const updateRideStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
        if (decoded.role !== "driver") {
            return res.status(403).json({ message: "Only drivers can accept rides" });
        }
        // Check active rides excluding the current one
        const activeRide = yield ride_model_1.Ride.findOne({
            driver: decoded.id,
            status: { $in: ["accepted", "in-transit"] },
            _id: { $ne: req.params.id }
        });
        if (activeRide) {
            return res.status(400).json({ message: "You already have an active ride" });
        }
        // Now update status
        const ride = yield driver_service_1.driverServices.updateRideStatus(req.params.id, decoded.id, req.body.status);
        res.json({ success: true, data: ride });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, error: error.message });
    }
});
exports.DriverControllers = {
    updateAvailability,
    updateRideStatus,
    getDriverEarnings,
    getDriverHistory
};
