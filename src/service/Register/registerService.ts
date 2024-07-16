import User from "../../models/User";
import { IUser } from "../../types/IUser";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "../../utils/emailUtils";
import { randomCode } from "../../utils/randomCode";

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
    const verificationCode = randomCode();

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      verificationCode,
    });
    await newUser.save();

    await sendVerificationEmail(email, verificationCode);

    return { message: "User registered successfully. Please check your email for verification." };
  } catch (error: any) {
    console.error("Error in registration service:", error);
    return {
      success: false,
      message: "Error in registration service",
      error: error.message,
    };
  }
};
