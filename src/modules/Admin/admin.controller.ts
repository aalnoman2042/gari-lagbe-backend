/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const approveDriver = async (req: Request, res: Response) => {
  try {
    const driverId = req.params.id;
    const driver = await adminServices.approveDriver(driverId);

    res.status(200).json({ success: true, data: driver });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const suspendDriver = async (req: Request, res: Response) => {
  try {
    const driverId = req.params.id;
    const driver = await adminServices.suspendDriver(driverId);

    res.status(200).json({ success: true, data: driver });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const blockUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await adminServices.blockUser(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const unblockUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await adminServices.unblockUser(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await adminServices.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllDrivers = async (_req: Request, res: Response) => {
  try {
    const drivers = await adminServices.getAllDrivers();
    res.status(200).json({ success: true, data: drivers });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getAllRiders = async (_req: Request, res: Response) => {
  try {
    const riders = await adminServices.getAllRiders();
    res.status(200).json({ success: true, data: riders });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllRides = async (_req: Request, res: Response) => {
  try {
    const rides = await adminServices.getAllRides();
    res.status(200).json({ success: true, data: rides });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};




export const AdminControllers = {
  approveDriver,
  suspendDriver,
  blockUser,
  unblockUser,
  getAllDrivers,
  getAllRides,
  getAllUsers,
  getAllRiders,
  
};
