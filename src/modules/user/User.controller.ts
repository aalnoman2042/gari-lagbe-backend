import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userServices } from "./user.service";
import { envVars } from "../../config/env";
import jwt from "jsonwebtoken"
import { setAuthCookie } from "../../utils/setAuthToken";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userServices.createUser(req.body);

         // token generate
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      envVars.JWT_ACCESS_SECRET as string,
      { expiresIn: envVars.JWT_ACCESS_EXPIRES  } as jwt.SignOptions
    );
    // set cookie
    setAuthCookie(res ,{accessToken})
    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User created successfully",
      data: { accessToken, user}
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Failed to create user",
      error,
    });
  }
};



const updateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await userServices.updateUserStatus(id, status);
  res.json({ success: true, data: updated });
};



export const UserControllers = {
  createUser,
  

  updateUserStatus,
};
