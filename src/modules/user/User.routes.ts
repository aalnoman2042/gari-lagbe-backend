import express from "express";
import { UserControllers } from "./User.controller";
import { authenticate, authorizeAdmin } from "../../middlewares/auth.middleware";


const router = express.Router();

router.post("/register", UserControllers.createUser);


router.patch(
  "/status/:id",
  authenticate,
  authorizeAdmin,
  UserControllers.updateUserStatus
);

export const userRouter = router;
