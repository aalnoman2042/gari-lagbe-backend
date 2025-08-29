"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const globalErrorHandlers_1 = require("./middlewares/globalErrorHandlers");
const NotFound_1 = require("./middlewares/NotFound");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
const corsOptions = {
    // origin: 'https://gari-lagbebd.netlify.app', // Replace with your frontend URL
    // origin: 'https://gari-lagbe-frontend.vercel.app', // Replace with your frontend URL
    origin: 'http://localhost:5173',
    credentials: true, // This is the key to allow cookies
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Test route
app.get("/", (req, res) => {
    res.send("Ride Booking API running...");
});
// root route
app.use("/gari-lagbe/v1", routes_1.router);
app.use(NotFound_1.notFound);
app.use(globalErrorHandlers_1.globalErrorHandler);
exports.default = app;
