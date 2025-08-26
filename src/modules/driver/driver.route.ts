import express from "express";
import { DriverControllers } from "./driver.controller";
import { authenticate, authorizeDriver } from "../../middlewares/auth.middleware";


export const driverRouter = express.Router();

driverRouter.patch("/availability/:id", DriverControllers.updateAvailability);
driverRouter.patch("/ride-status/:id",authenticate, authorizeDriver, DriverControllers.updateRideStatus);
driverRouter.get("/:driverId/history",authenticate, authorizeDriver, DriverControllers.getDriverHistory);
driverRouter.get("/driver-earnings/:driverId",authenticate, authorizeDriver, DriverControllers.getDriverEarnings);
driverRouter.get("/requestedRide",authenticate, authorizeDriver, DriverControllers.getRequestedRides);

