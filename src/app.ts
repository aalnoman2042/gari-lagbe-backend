import express from "express";
import cors from "cors";


import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());




// Test route
app.get("/", (req, res) => {
  res.send("Ride Booking API running...");
});

// root route
app.use("/gari-lagbe/v1", router);

export default app;
