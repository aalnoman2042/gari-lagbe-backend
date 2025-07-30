import express from "express";
import { AuthControllers } from "./auth.controller";

export const authRouter = express.Router();


authRouter.post("/login", AuthControllers.loginUser);