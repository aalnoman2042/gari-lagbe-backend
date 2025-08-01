"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const rideSchema = new mongoose_1.Schema({
    rider: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },
    fare: { type: Number, required: true },
    status: {
        type: String,
        enum: ["requested", "accepted", "picked_up", "in_transit", "completed", "cancelled"],
        default: "requested",
    },
    requestedAt: { type: Date, default: Date.now },
    acceptedAt: Date,
    completedAt: Date,
}, { timestamps: true });
exports.Ride = (0, mongoose_1.model)("Ride", rideSchema);
