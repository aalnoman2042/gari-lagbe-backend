import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../user/User.model";
import { envVars } from "../../config/env";


const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentialssss");

  const accessToken = jwt.sign(
    { id: user._id , role: user.role },
    envVars.JWT_ACCESS_SECRET as string, 
    { expiresIn: envVars.JWT_ACCESS_EXPIRES  }as jwt.SignOptions
  );

  return { accessToken, user };
};

export const authServices = { login };
