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
exports.rideServices = void 0;
const ride_model_1 = require("./ride.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const requestRide = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
    const activeRide = yield ride_model_1.Ride.findOne({
        rider: decodedToken.id,
        status: { $in: ["requested", "accepted", "in-transit"] },
    });
    if (activeRide) {
        throw new Error("You already have an active ride. Please complete it before requesting a new one.");
    }
    payload.rider = decodedToken.id;
    const ride = new ride_model_1.Ride(payload);
    return yield ride.save();
});
const cancelRide = (rideId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
    const ride = yield ride_model_1.Ride.findOne({ _id: rideId, rider: decodedToken.id });
    if (!ride)
        throw new Error("Ride not found or not owned by rider");
    if (ride.status !== "requested") {
        throw new Error("Ride cannot be cancelled at this stage");
    }
    ride.status = "cancelled";
    ride.completedAt = new Date(); // cancel time log করতে পারো
    return yield ride.save();
});
const getRiderHistory = (riderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ride_model_1.Ride.find({ rider: riderId }).sort({ requestedAt: -1 });
});
exports.rideServices = {
    requestRide,
    cancelRide,
    getRiderHistory,
};
