import mongoose, { Schema } from "mongoose";
import { IUser } from "./User.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "rider", "driver", "super_admin"],
      default: "rider",
    },
    status: {
      type: String,
      enum: ["active", "suspended", "blocked"],
      default: "active",
    },
    approved: { type: Boolean, default: false },
    onlineStatus: { type: Boolean, default: false },
    vehicleInfo: { type: String },

    // SOS-related
    enableSOS: { type: Boolean, default: false },
emergencyContacts: [
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String, required: false }
  }
]
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
