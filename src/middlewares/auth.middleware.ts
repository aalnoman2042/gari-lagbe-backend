/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envVars } from "../config/env";


export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || req.cookies.accessToken;
  
  
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, envVars.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
// Rider-only middleware
export const authorizeRider = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "rider" && req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Riders only" });
  }
  next();
};

// Driver-only middleware
export const authorizeDriver = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "driver" && req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Drivers only" });
  }
  next();
};
