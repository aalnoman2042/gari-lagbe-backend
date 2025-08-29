"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideControllers = void 0;
const ride_serivice_1 = require("./ride.serivice");
const http_status_codes_1 = require("http-status-codes");
const requestRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ride = yield ride_serivice_1.rideServices.requestRide(req.body, req.headers.authorization || req.cookies.accessToken);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, data: ride });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, error: error.message });
    }
});
const cancelRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ride = yield ride_serivice_1.rideServices.cancelRide(req.params.id, req.headers.authorization || req.cookies.accessToken);
        // console.log(ride);
        res.json({ success: true, data: ride });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, error: error.message });
    }
});
const getRiderHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_serivice_1.rideServices.getRiderHistory(req.params.riderId);
    res.json({ success: true, data: rides });
});
const getOngoingRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Authorization token from header or cookie
        const token = req.headers.authorization || req.cookies.accessToken;
        if (!token) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ success: false, message: "Unauthorized" });
        }
        // console.log(token);
        // Call service to fetch ongoing rides
        const rides = yield ride_serivice_1.rideServices.getRiderOngoingRides(token);
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: rides });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, error: error.message });
    }
});
exports.RideControllers = {
    requestRide,
    cancelRide,
    getRiderHistory,
    getOngoingRides
};
