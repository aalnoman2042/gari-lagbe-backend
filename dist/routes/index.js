"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const User_routes_1 = require("../modules/user/User.routes");
const ride_routes_1 = require("../modules/Ride/ride.routes");
const driver_route_1 = require("../modules/driver/driver.route");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: User_routes_1.userRouter,
    },
    { path: "/ride", route: ride_routes_1.rideRouter },
    { path: "/driver", route: driver_route_1.driverRouter },
    { path: "/admin", route: admin_routes_1.adminRouter },
    { path: "/auth", route: auth_routes_1.authRouter },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
