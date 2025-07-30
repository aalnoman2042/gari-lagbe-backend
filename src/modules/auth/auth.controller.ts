/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { authServices } from "./auth.service";

 const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await authServices.login(email, password);
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
};

export const AuthControllers = {
  loginUser
}