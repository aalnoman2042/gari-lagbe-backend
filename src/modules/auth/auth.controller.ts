/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { authServices } from "./auth.service";
import { setAuthCookie } from "../../utils/setAuthToken";


const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const {user, accessToken, refreshToken} = await authServices.login(email, password);

    setAuthCookie(res, {accessToken, refreshToken})

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        user
      }
    });

  

  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
};

export const AuthControllers = {
  loginUser,
};
