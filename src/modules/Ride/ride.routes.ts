import express from "express";
import { RideControllers } from "./ride.controller";
import { authenticate, authorizeRider } from "../auth/auth.middleware";

export const rideRouter = express.Router();

rideRouter.post("/request",authenticate,authorizeRider, RideControllers.requestRide);
rideRouter.patch("/cancel/:id",authenticate,authorizeRider, RideControllers.cancelRide);
rideRouter.get("/rider/:riderId/history",authenticate,authorizeRider, RideControllers.getRiderHistory);

