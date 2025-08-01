"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("./User.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/register", User_controller_1.UserControllers.createUser);
router.patch("/status/:id", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, User_controller_1.UserControllers.updateUserStatus);
exports.userRouter = router;
