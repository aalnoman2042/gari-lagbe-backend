import { Ride } from "./ride.model";
import { IRide } from "./ride.interface";

import jwt, { JwtPayload } from "jsonwebtoken"
import { envVars } from "../../config/env";

const requestRide = async (payload: IRide, token : string) => {
  

  const decodedToken = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload

  const activeRide = await Ride.findOne({
    rider: decodedToken.id,
    status: { $in: ["requested", "accepted", "in-transit"] },
  });
   if (activeRide) {
    throw new Error("You already have an active ride. Please complete it before requesting a new one.");
  }
  
   payload.rider = decodedToken.id

  const ride = new Ride(payload);
  return await ride.save();
};

const cancelRide = async (rideId: string, token: string) => {
  const decodedToken = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload
  
  const ride = await Ride.findOne({ _id: rideId, rider: decodedToken.id });

  if (!ride) throw new Error("Ride not found or not owned by rider");

  if (ride.status !== "requested") {
    throw new Error("Ride cannot be cancelled at this stage");
  }

  ride.status = "cancelled";
  ride.completedAt = new Date(); // cancel time log করতে পারো
  return await ride.save();
};






const getRiderHistory = async (riderId: string) => {
  return await Ride.find({ rider: riderId }).sort({ requestedAt: -1 });
};



export const rideServices = {
  requestRide,
  cancelRide,

  getRiderHistory,

};
