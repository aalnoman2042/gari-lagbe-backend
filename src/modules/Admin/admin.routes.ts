import express from "express";
import { AdminControllers } from "./admin.controller";
import { authenticate, authorizeAdmin } from "../auth/auth.middleware";

export const adminRouter = express.Router();

adminRouter.patch("/drivers/:id/approve",authenticate, authorizeAdmin, AdminControllers.approveDriver);
adminRouter.patch("/drivers/:id/suspend",authenticate, authorizeAdmin, AdminControllers.suspendDriver);
adminRouter.patch("/users/:id/block",authenticate, authorizeAdmin, AdminControllers.blockUser);
adminRouter.patch("/users/:id/unblock",authenticate, authorizeAdmin, AdminControllers.unblockUser);
adminRouter.get("/users", authenticate, authorizeAdmin, AdminControllers.getAllUsers);
adminRouter.get("/drivers", authenticate, authorizeAdmin, AdminControllers.getAllDrivers);
adminRouter.get("/rides",authenticate, authorizeAdmin, AdminControllers.getAllRides);
adminRouter.get("/riders", authenticate, authorizeAdmin, AdminControllers.getAllRiders);
