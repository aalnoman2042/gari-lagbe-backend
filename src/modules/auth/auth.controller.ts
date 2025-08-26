/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";
import { setAuthCookie } from "../../utils/setAuthToken";
import httpStatus from "http-status-codes"


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
const logout  = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    })
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    })
 

    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "loged out successful",
      data: null,
  });
  } catch (error) {
    // console.error("Login Error:", error);
    next(error);
  }
};


export const AuthControllers = {
  loginUser,
  logout
};
