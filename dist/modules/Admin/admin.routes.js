"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.patch("/drivers/:id/approve", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, admin_controller_1.AdminControllers.approveDriver);
exports.adminRouter.patch("/drivers/:id/suspend", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, admin_controller_1.AdminControllers.suspendDriver);
exports.adminRouter.patch("/users/:id/block", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, admin_controller_1.AdminControllers.blockUser);
exports.adminRouter.patch("/users/:id/unblock", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, admin_controller_1.AdminControllers.unblockUser);
exports.adminRouter.get("/users", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, admin_controller_1.AdminControllers.getAllUsers);
exports.adminRouter.get("/drivers", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, admin_controller_1.AdminControllers.getAllDrivers);
exports.adminRouter.get("/rides", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, admin_controller_1.AdminControllers.getAllRides);
exports.adminRouter.get("/riders", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, admin_controller_1.AdminControllers.getAllRiders);
