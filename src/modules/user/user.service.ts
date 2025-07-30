import { User } from "./User.model";
import { IUser } from "./User.interface";
import { envVars } from "../../config/env";
import bcrypt from "bcryptjs"

const createUser = async (payload: Partial<IUser>): Promise<IUser> => {
  // Password hash 
  if (payload.password) {
    const saltRounds = parseInt(envVars.BCRYPT_SALT_ROUND, 10);
    payload.password = await bcrypt.hash(payload.password, saltRounds);
  }

  const user = new User(payload);
  return await user.save();
}


const updateUserStatus = async (id: string, status: "active" | "blocked") => {
  return await User.findByIdAndUpdate(id, { status }, { new: true });
};




export const userServices = {
  createUser,
//    getAllUsers,
 
  updateUserStatus,
};
