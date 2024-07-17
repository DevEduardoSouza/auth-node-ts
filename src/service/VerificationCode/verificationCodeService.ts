import User from "../../models/User";
import { IUser } from "../../types/IUser";

export const verificationCodeService = async (user: IUser) => {
  try {
    const { email, verificationCode } = user;

    const existingUserByEmail = await User.findOne({ email });

    if (!existingUserByEmail) {
      return { message: "Email does not exist" };
    }

    if (verificationCode !== user.verificationCode) {
      return { message: "Verification code is incorrect" };
    }
    
    await User.updateOne({ email }, { verified: true });

    return { message: "Email verified successfully" };
  } catch (error) {
    console.error("Error in verificationCode service:", error);
    throw error;
  }
};
