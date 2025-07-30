/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { authServices } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log(email);
    
    const result = await authServices.login(email, password);
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const AuthControllers = { login };
