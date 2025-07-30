import { Ride } from "../Ride/ride.model";
import { User } from "../user/User.model";

const approveDriver = async (driverId: string) => {
  const driver = await User.findById(driverId);
  if (!driver) throw new Error("Driver not found");
  if (driver.role !== "driver") throw new Error("User is not a driver");

  driver.approved = true;
  driver.status = "active";
  return await driver.save();
};

const suspendDriver = async (driverId: string) => {
  const driver = await User.findById(driverId);
  if (!driver) throw new Error("Driver not found");
  if (driver.role !== "driver") throw new Error("User is not a driver");

  driver.status = "suspended";
  return await driver.save();
};

const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.status = "blocked";
  return await user.save();
};

const unblockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.status = "active";
  return await user.save();
};
const getAllUsers = async () => {
  return await User.find();
};

const getAllDrivers = async () => {
  return await User.find({ role: "driver" });
};
const getAllRiders = async () => {
  return await User.find({ role: "rider" });
};

const getAllRides = async () => {
  return await Ride.find();
};


export const adminServices = {
  approveDriver,
  suspendDriver,
  blockUser,
  unblockUser,
  getAllUsers,
  getAllDrivers,
  getAllRides,
  getAllRiders,
  
};
