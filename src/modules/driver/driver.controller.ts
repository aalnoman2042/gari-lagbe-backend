/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { driverServices } from "./driver.service";
import { StatusCodes } from "http-status-codes";

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
    const ride = await driverServices.updateRideStatus(req.params.id, req.body.driverId, req.body.status);
   
    
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
