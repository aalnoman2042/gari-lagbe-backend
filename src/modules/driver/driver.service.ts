import { Types } from "mongoose";
import { Ride } from "../Ride/ride.model";
import { User } from "../user/User.model";
import { IRide } from "../Ride/ride.interface";

const updateAvailability = async (userId: string) => {
  const driver = await User.findById(userId);
  if (!driver) throw new Error("user not found");
  if (driver.role !== "driver") throw new Error("User is not a driver");

  if(driver.onlineStatus){
    driver.onlineStatus = false
  }else{
    driver.onlineStatus = true
  }

  
  return await driver.save();
};
const updateRideStatus = async (
  rideId: string,
  driverId: string,
  status: IRide["status"]
) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error("Ride not found");

  //  If status is 'accepted'
  if (status === "accepted") {
    const driver = await User.findById(driverId);
    if (!driver) throw new Error("Driver not found");

    // Check approval & suspension
    if (!driver.approved || driver.status === "suspended") {
      throw new Error("Driver not eligible to accept rides");
    }

    if (ride.status !== "requested") {
      throw new Error("Ride cannot be accepted at this stage");
    }

    ride.driver = new Types.ObjectId(driverId);
    ride.status = "accepted";
    ride.acceptedAt = new Date();
  }

  // If status is 'picked_up'
  else if (status === "picked_up") {
    if (ride.status !== "accepted") {
      throw new Error("Ride must be accepted before picking up");
    }
    if (!ride.driver || ride.driver.toString() !== driverId) {
      throw new Error("Driver not authorized for this ride");
    }

    ride.status = "picked_up";
    ride.pickedUpAt = new Date();
  }

  // If status is 'in_transit'
  else if (status === "in_transit") {
    if (ride.status !== "picked_up") {
      throw new Error("Ride must be picked up before in transit");
    }
    if (!ride.driver || ride.driver.toString() !== driverId) {
      throw new Error("Driver not authorized for this ride");
    }

    ride.status = "in_transit";
  }

  // If status is 'completed'
  else if (status === "completed") {
    if (ride.status !== "in_transit") {
      throw new Error("Ride must be in transit before completion");
    }
    if (!ride.driver || ride.driver.toString() !== driverId) {
      throw new Error("Driver not authorized for this ride");
    }

    ride.status = "completed";
    ride.completedAt = new Date();
  }

  // Invalid status
  else {
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
