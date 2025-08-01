"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const express_1 = __importDefault(require("express"));
const driver_controller_1 = require("./driver.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
exports.driverRouter = express_1.default.Router();
exports.driverRouter.patch("/availability/:id", driver_controller_1.DriverControllers.updateAvailability);
exports.driverRouter.patch("/ride-status/:id", auth_middleware_1.authenticate, auth_middleware_1.authorizeDriver, driver_controller_1.DriverControllers.updateRideStatus);
exports.driverRouter.get("/:driverId/history", auth_middleware_1.authenticate, auth_middleware_1.authorizeDriver, driver_controller_1.DriverControllers.getDriverHistory);
exports.driverRouter.get("/driver-earnings/:driverId", auth_middleware_1.authenticate, auth_middleware_1.authorizeDriver, driver_controller_1.DriverControllers.getDriverEarnings);
