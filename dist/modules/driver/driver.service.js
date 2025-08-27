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
exports.driverServices = void 0;
const mongoose_1 = require("mongoose");
const ride_model_1 = require("../Ride/ride.model");
const User_model_1 = require("../user/User.model");
const updateAvailability = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield User_model_1.User.findById(userId);
    if (!driver)
        throw new Error("user not found");
    if (driver.role !== "driver")
        throw new Error("User is not a driver");
    if (driver.onlineStatus) {
        driver.onlineStatus = false;
    }
    else {
        driver.onlineStatus = true;
    }
    return yield driver.save();
});
const updateRideStatus = (rideId, driverId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new Error("Ride not found");
    //  If status is 'accepted'
    if (status === "accepted") {
        const driver = yield User_model_1.User.findById(driverId);
        if (!driver)
            throw new Error("Driver not found");
        // Check approval & suspension
        if (!driver.approved || driver.status === "suspended") {
            throw new Error("Driver not eligible to accept rides");
        }
        if (ride.status !== "requested") {
            throw new Error("Ride cannot be accepted at this stage");
        }
        ride.driver = new mongoose_1.Types.ObjectId(driverId);
        ride.status = "accepted";
        ride.acceptedAt = new Date();
    }
    // If status is 'picked_up'
    else if (status === "picked_up") {
        if (ride.status !== "accepted") {
            throw new Error("Ride must be accepted before picking up");
        }
        if (!ride.driver || ride.driver.toString() !== driverId) {
            throw new Error("Driver not authorized for this ride");
        }
        ride.status = "picked_up";
        ride.pickedUpAt = new Date();
    }
    // If status is 'in_transit'
    else if (status === "in_transit") {
        if (ride.status !== "picked_up") {
            throw new Error("Ride must be picked up before in transit");
        }
        if (!ride.driver || ride.driver.toString() !== driverId) {
            throw new Error("Driver not authorized for this ride");
        }
        ride.status = "in_transit";
    }
    // If status is 'completed'
    else if (status === "completed") {
        if (ride.status !== "in_transit") {
            throw new Error("Ride must be in transit before completion");
        }
        if (!ride.driver || ride.driver.toString() !== driverId) {
            throw new Error("Driver not authorized for this ride");
        }
        ride.status = "completed";
        ride.completedAt = new Date();
    }
    // Invalid status
    else {
        throw new Error("Invalid status transition");
    }
    return yield ride.save();
});
const getDriverHistory = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ride_model_1.Ride.find({ driver: driverId }).sort({ completedAt: -1 });
});
const getDriverEarnings = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    // শুধু completed rides ধরে earnings হিসাব হবে
    const completedRides = yield ride_model_1.Ride.find({ driver: driverId, status: "completed" });
    const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
    return {
        totalEarnings,
        completedRidesCount: completedRides.length,
        rides: completedRides,
    };
});
exports.driverServices = {
    updateAvailability,
    updateRideStatus,
    getDriverEarnings,
    getDriverHistory
};
