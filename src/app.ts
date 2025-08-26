import express from "express";
import cors from "cors";


import dotenv from "dotenv";
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandlers";
import { notFound } from "./middlewares/NotFound";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // This is the key to allow cookies
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());



// Test route
app.get("/", (req, res) => {
  res.send("Ride Booking API running...");
});

// root route
app.use("/gari-lagbe/v1", router);


app.use(notFound)
app.use(globalErrorHandler)

export default app;
