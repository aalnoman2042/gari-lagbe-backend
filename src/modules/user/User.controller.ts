/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userServices } from "./user.service";
import { envVars } from "../../config/env";
import jwt, { JwtPayload } from "jsonwebtoken"
import { setAuthCookie } from "../../utils/setAuthToken";
import bcrypt from "bcryptjs"
import { User } from "./User.model";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userServices.createUser(req.body);
    
    

         // token generate
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      envVars.JWT_ACCESS_SECRET as string,
      { expiresIn: envVars.JWT_ACCESS_EXPIRES  } as jwt.SignOptions
    );

     const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        envVars.JWT_REFRESH_SECRET,
        { expiresIn: envVars.JWT_REFRESH_EXPIRES } as jwt.SignOptions
      );
    // set cookie
    setAuthCookie(res ,{accessToken, refreshToken})
    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User created successfully",
      data: { accessToken, user}
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Failed to create user",
      error,
    });
  }
};



const updateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await userServices.updateUserStatus(id, status);
  res.json({ success: true, data: updated });
};

const getMe = async (req: Request, res: Response) => {
 
  
  const token = req.headers.authorization || req.cookies.accessToken;
  if (!token) {
     res.status(401).json({
      success: false,
      message: "No token found, please login first",
    });
  }
  try {
    // Decode and verify the JWT token
    const decodedToken = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    
    // Retrieve user info from the decoded token's ID
    const result = await userServices.getMe(decodedToken.id);
    
    // Return the user data
    return res.status(200).json({
      success: true,
      message: "Your profile retrieved successfully",
      data: result.data,
    });


  } catch (error) {
    // Handle errors (e.g., token invalid/expired)
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  

  const { oldPassword, newPassword, ...updateData } = req.body; // destructure
  const token = req.cookies.accessToken || (req.headers.authorization as string);
  const decodedToken = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;

  try {
    // DB থেকে ইউজার বের করো
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // যদি password update করতে চায়
    if (newPassword) {
      // old password check
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      // নতুন password hash করে দাও
      const saltRounds = parseInt(envVars.BCRYPT_SALT_ROUND, 10);
      updateData.password = await bcrypt.hash(newPassword, saltRounds);
    }

    // Update user
    const updatedUser = await userServices.updateUserService(decodedToken.id, updateData);

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


 const updateSOSContacts= async (req: Request, res: Response) => {
  console.log(req.body);

  const SOSContacts = req.body
  
  const token = req.cookies.accessToken || (req.headers.authorization as string);
  const decodedToken = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;

  try {
    // DB থেকে ইউজার বের করো
    const user = await User.findById(decodedToken.id);
    console.log(user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user SOS
    const updatedUser = await userServices.updateSOSContacts(decodedToken.id, SOSContacts);

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
  }

  // Trigger SOS during active ride
  const triggerSOS= async (req: Request, res: Response) => {
    const token = req.cookies.accessToken || (req.headers.authorization as string);
  const decodedToken = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;

    
    try {
      const userId = decodedToken.id;
      const { rideId, location } = req.body; // location: {lat, lng}

      const result = await userServices.triggerSOS(userId, rideId, location);

      res.status(200).json({ success: true, message: result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Get user SOS info
  const getSOSInfo= async (req: Request, res: Response) => {
  const token = req.cookies.accessToken as string || req.headers.authorization as string;
  const decodedToken = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    try {
      const userId = decodedToken.id;

      const sosInfo = await userServices.getSOSInfo(userId);

      res.status(200).json({ success: true, data: sosInfo });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }



export const UserControllers = {
  createUser,
  
getMe,
  updateUserStatus,
  updateUser,


  updateSOSContacts,
  getSOSInfo,
  triggerSOS

};
