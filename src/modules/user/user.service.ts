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

// Update SOS contacts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateSOSContacts=  async (userId: string , sosData: any) => {
    console.log(sosData);
    
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (sosData.enableSOS !== undefined) user.enableSOS = sosData.enableSOS;
    if (sosData.emergencyContacts) user.emergencyContacts = sosData.emergencyContacts;

    await user.save();
    return user;
  }

  // Trigger SOS
  // const triggerSOS= async (userId: string, rideId: string, location: { lat: number; lng: number }) => {
  //   const user = await User.findById(userId);
  //   if (!user) throw new Error("User not found");
  //   if (!user.enableSOS) throw new Error("SOS is not enabled for this user");

  //   // Here you can integrate:
  //   // 1. emailjs / nodemailer for email
  //   // 2. twilio / whatsapp-web.js for SMS/WhatsApp
  //   // 3. send GPS link in message
  //   // 4. log to DB if needed

  //   // For now just a placeholder
  //   console.log("SOS Triggered!", { userId, rideId, location, contacts: user.emergencyContacts });

  //   return "Emergency contact notified successfully";
  // }

  // Get SOS info
  const getSOSInfo =  async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return {
      enableSOS: user.enableSOS,
      emergencyContacts: user.emergencyContacts || [],
    };
  }




export const userServices = {
  createUser,
getMe,
  updateUserStatus,
  updateUserService,




  getSOSInfo,
  updateSOSContacts,
  // triggerSOS
};
