"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = require("../Error_helpers/AppError");
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err instanceof AppError_1.AppError ? err.statusCode : 500;
    const message = err instanceof AppError_1.AppError ? err.message : "Something went wrong!";
    return res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
exports.globalErrorHandler = globalErrorHandler;
