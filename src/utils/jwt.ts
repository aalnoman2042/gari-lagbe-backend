/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
// import envVars from "./envVars"; // Ensure you import the JWT secret key from the environment variables

const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, please login",
    });
  }

  try {
    const decodedToken = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    req.user = decodedToken; // Attach the decoded token (user info) to req.user
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default jwtAuthMiddleware;
