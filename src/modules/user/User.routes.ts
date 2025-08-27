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

router.get("/me",  UserControllers.getMe)
router.patch("/updateUser",  UserControllers.updateUser)

router.patch(`/updateSOSContacts`,  UserControllers.updateSOSContacts);

// Trigger SOS during an active ride
router.patch("/triggerSOS", UserControllers.triggerSOS);

// Get user SOS info (optional)
router.get("/getSOSInfo" , UserControllers.getSOSInfo);


export const userRouter = router;
