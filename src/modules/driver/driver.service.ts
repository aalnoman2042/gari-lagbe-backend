import { Types } from "mongoose";
import { Ride } from "../Ride/ride.model";
import { User } from "../user/User.model";
import { IRide } from "../Ride/ride.interface";

const updateAvailability = async (driverId: string, onlineStatus: boolean) => {
  const driver = await User.findById(driverId);
  if (!driver) throw new Error("Driver not found");
  if (driver.role !== "driver") throw new Error("User is not a driver");

  driver.onlineStatus = onlineStatus;
  return await driver.save();
};
const updateRideStatus = async (
  rideId: string,
  driverId: string,
  status: IRide["status"]
) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error("Ride not found");

  if (status === "accepted") {
    // শুধুমাত্র requested থেকে accepted
    if (ride.status !== "requested") {
      throw new Error("Ride cannot be accepted at this stage");
    }
    ride.driver = new Types.ObjectId(driverId);
    ride.status = "accepted";
    ride.acceptedAt = new Date();
  } else if (status === "in_transit") {
    // শুধুমাত্র accepted driver in_transit করতে পারবে
    if (ride.status !== "accepted") {
      throw new Error("Ride must be accepted before in_transit");
    }
    if (!ride.driver || ride.driver.toString() !== driverId) {
      throw new Error("Driver not authorized for this ride");
    }
    ride.status = "in_transit";
  } else if (status === "completed") {
    // শুধুমাত্র in_transit driver complete করতে পারবে
    if (ride.status !== "in_transit") {
      throw new Error("Ride must be in transit to complete");
    }
    if (!ride.driver || ride.driver.toString() !== driverId) {
      throw new Error("Driver not authorized for this ride");
    }
    ride.status = "completed";
    ride.completedAt = new Date();
  } else {
    throw new Error("Invalid status transition");
  }

  return await ride.save();
};

const getDriverHistory = async (driverId: string) => {
  return await Ride.find({ driver: driverId }).sort({ completedAt: -1 });
};

const getDriverEarnings = async (driverId: string) => {
  // শুধু completed rides ধরে earnings হিসাব হবে
  const completedRides = await Ride.find({ driver: driverId, status: "completed" });

  const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);

  return {
    totalEarnings,
    completedRidesCount: completedRides.length,
    rides: completedRides,
  };
};

export const driverServices = {
  updateAvailability,
  updateRideStatus,
  getDriverEarnings,
  getDriverHistory
};
