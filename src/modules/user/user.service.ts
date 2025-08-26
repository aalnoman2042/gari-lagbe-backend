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


const updateUserStatus = async (_id: string, status: "active" | "blocked") => {
  return await User.findByIdAndUpdate(_id, { status }, { new: true });
};

const getMe = async (id: string) => {
  // console.log(id);
  
    const user = await User.findById(id).select("-password");
    return {
        data: user
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUserService = async (userId: string, updateData: any) => {
  try {
    // Find user by ID and update with new data
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    return {
      data: updatedUser
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new Error('Error updating user: ' );
  }
};


export const userServices = {
  createUser,
getMe,
  updateUserStatus,
  updateUserService
};
