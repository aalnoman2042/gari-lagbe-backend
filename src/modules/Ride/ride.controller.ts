/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { rideServices } from "./ride.serivice";
import { StatusCodes } from "http-status-codes";

const requestRide = async (req: Request, res: Response) => {
 
  
  try {
    const ride = await rideServices.requestRide(req.body, req.headers.authorization || req.cookies.accessToken as string);
  
    
    res.status(StatusCodes.CREATED).json({ success: true, data: ride });
  } catch (error : any) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: error.message });
  }
};

const cancelRide = async (req: Request, res: Response) => {
  try {
    const ride = await rideServices.cancelRide(req.params.id, req.headers.authorization || req.cookies.accessToken as string);
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

const getOngoingRides = async (req: Request, res: Response) => {
 
  
  try {
    // Authorization token from header or cookie
    const token = req.headers.authorization || req.cookies.accessToken as string;
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: "Unauthorized" });
    }
    // console.log(token);
    

    // Call service to fetch ongoing rides
    const rides = await rideServices.getRiderOngoingRides(token as string);

    res.status(StatusCodes.OK).json({ success: true, data: rides });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: error.message });
  }
};

export const RideControllers = {
  requestRide,
  cancelRide,

  getRiderHistory,
  getOngoingRides

};
