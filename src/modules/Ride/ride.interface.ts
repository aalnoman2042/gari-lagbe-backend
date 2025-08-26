import { Types } from "mongoose";

export interface IRide {
  rider: Types.ObjectId; // Rider user ID
  driver?: Types.ObjectId; // Driver user ID
  pickupLocation: string;
  destination: string;
  fare: number;
  status: "requested" | "accepted" | "picked_up" | "in_transit" | "completed" | "cancelled";
  requestedAt: Date;
  completedAt?: Date;
  acceptedAt?: Date;
  pickedUpAt?: Date
}
