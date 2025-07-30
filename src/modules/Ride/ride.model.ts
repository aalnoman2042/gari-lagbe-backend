import { Schema, model } from "mongoose";
import { IRide } from "./ride.interface";

const rideSchema = new Schema<IRide>(
  {
    rider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: Schema.Types.ObjectId, ref: "User" },
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
  },
  { timestamps: true }
);

export const Ride = model<IRide>("Ride", rideSchema);
