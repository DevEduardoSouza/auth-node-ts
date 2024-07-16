import User from "../../models/User";
import { IUser } from "../../types/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (user: IUser) => {
  try {
    const { username, password, email } = user;

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return { message: "email already exists" };
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return { message: "username already exists" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    return { message: "User registered successfully" };
  } catch (error: any) {
    console.error("Error in registration service:", error);
    return {
      success: false,
      message: "Error in registration service",
      error: error.message,
    };
  }
};
