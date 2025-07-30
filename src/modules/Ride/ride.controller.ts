/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { rideServices } from "./ride.serivice";
import { StatusCodes } from "http-status-codes";

const requestRide = async (req: Request, res: Response) => {
  try {
    const ride = await rideServices.requestRide(req.body, req.headers.authorization as string);
    res.status(StatusCodes.CREATED).json({ success: true, data: ride });
  } catch (error : any) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: error.message });
  }
};

const cancelRide = async (req: Request, res: Response) => {
  try {
    const ride = await rideServices.cancelRide(req.params.id, req.headers.authorization as string);
    // console.log(ride);
    
    res.json({ success: true, data: ride });
  } catch (error : any) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: error.message });
  }
};



const getRiderHistory = async (req: Request, res: Response) => {
  const rides = await rideServices.getRiderHistory(req.params.riderId);
  res.json({ success: true, data: rides });
};



export const RideControllers = {
  requestRide,
  cancelRide,

  getRiderHistory,

};
