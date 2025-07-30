import { Router } from "express";
import { userRouter } from "../modules/user/User.routes";
import { rideRouter } from "../modules/Ride/ride.routes";
import { driverRouter } from "../modules/driver/driver.route";
import { adminRouter } from "../modules/Admin/admin.routes";
import { authRouter } from "../modules/auth/auth.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
   { path: "/ride", route: rideRouter },
   { path: "/driver", route: driverRouter },
   { path: "/admin", route: adminRouter },
   { path: "/auth", route: authRouter },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
