/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { driverServices } from "./driver.service";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { envVars } from "../../config/env";
import { Ride } from "../Ride/ride.model";

const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { onlineStatus } = req.body;
    const driverId = req.params.id;

    const driver = await driverServices.updateAvailability(driverId, 
onlineStatus);
    res.status(200).json({ success: true, data: driver });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getDriverHistory = async (req: Request, res: Response) => {
  const rides = await driverServices.getDriverHistory(req.params.driverId);
  res.json({ success: true, data: rides });
};

const getDriverEarnings = async (req: Request, res: Response) => {
  try {
    const driverId = req.params.driverId;
    const earnings = await driverServices.getDriverEarnings(driverId);

    res.status(200).json({ success: true, data: earnings });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const updateRideStatus = async (req: Request, res: Response) => {
  try {
       const token = req.headers.authorization

       if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
     const decoded = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as { id: string; role: string };

     if (decoded.role !== "driver") {
      return res.status(403).json({ message: "Only drivers can accept rides" });
    }

    const ride = await driverServices.updateRideStatus(req.params.id, decoded.id, req.body.status);

    // Step 1: Check if driver already has an active ride
    const activeRide = await Ride.findOne({
      driver: decoded.id,
      status: { $in: ["accepted", "in-transit"] },
    });

    if (activeRide) {
      return res.status(400).json({ message: "You already have an active ride" });
    }

    
    res.json({ success: true, data: ride });
  } catch (error : any) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: error.message  });
  }
};
export const DriverControllers = {
  updateAvailability,
  updateRideStatus,
  getDriverEarnings,
  getDriverHistory
};
