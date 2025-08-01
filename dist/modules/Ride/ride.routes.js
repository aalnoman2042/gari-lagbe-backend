"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRouter = void 0;
const express_1 = __importDefault(require("express"));
const ride_controller_1 = require("./ride.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
exports.rideRouter = express_1.default.Router();
exports.rideRouter.post("/request", auth_middleware_1.authenticate, auth_middleware_1.authorizeRider, ride_controller_1.RideControllers.requestRide);
exports.rideRouter.patch("/cancel/:id", auth_middleware_1.authenticate, auth_middleware_1.authorizeRider, ride_controller_1.RideControllers.cancelRide);
exports.rideRouter.get("/rider/:riderId/history", auth_middleware_1.authenticate, auth_middleware_1.authorizeRider, ride_controller_1.RideControllers.getRiderHistory);
