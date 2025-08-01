"use strict";
/* eslint-disable no-console */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./config/env");
const app_1 = __importDefault(require("./app"));
let server;
const startserver = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.MONGODB_URL);
        console.log("connect to db");
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`server is listening to ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startserver();
}))();
// error handle 
process.on("unhandledRejection", (err) => {
    console.log("unhandle rejection detected , server is shutting down", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
process.on("uncaughtException", (err) => {
    console.log("uncaught rejection detected , server is shutting down", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
process.on("SIGTERM", () => {
    console.log("sigterm signal");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
process.on("SIGINT", () => {
    console.log("sigINt , server shutting down");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
