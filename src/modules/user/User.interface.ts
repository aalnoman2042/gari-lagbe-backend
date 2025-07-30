import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "rider" | "driver" | "super_admin";
  status: "active" | "blocked" | "suspended";
  approved?: boolean;
  onlineStatus?: boolean;
  vehicleInfo?: string;
}
