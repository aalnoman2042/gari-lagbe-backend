"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// utils/AppError.ts
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        // Maintains proper stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
