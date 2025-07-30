import { envVars } from "../../config/env";
import jwt from "jsonwebtoken"
import { User } from "../user/User.model";
import bcrypt from "bcryptjs"

 const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("user does not exist, please sign up first");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    envVars.JWT_ACCESS_SECRET,
    { expiresIn: envVars.JWT_ACCESS_EXPIRES } as jwt.SignOptions
  );

  // const refreshToken = jwt.sign(
  //   { id: user._id, role: user.role },
  //   envVars.JWT_REFRESH_SECRET!,
  //   { expiresIn: envVars.JWT_REFRESH_EXPIRES }
  // );

  return { user, accessToken };
};


export const authServices = {
  login
}