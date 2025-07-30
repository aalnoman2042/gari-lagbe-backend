/* eslint-disable @typescript-eslint/no-unused-vars */
// middlewares/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../Error_helpers/AppError";


export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : "Something went wrong!";

  return res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
