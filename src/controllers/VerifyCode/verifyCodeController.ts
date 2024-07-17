import { Request, Response } from "express";
import { IUser } from "../../types/IUser";
import { verificationCodeService } from "../../service/VerificationCode/verificationCodeService";

export const verifyCodeController = async (req: Request, res: Response) => {
  try {
    const { email, verificationCode } = req.body;

    if (!verificationCode || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await verificationCodeService({ email, verificationCode } as IUser);
    res.json(result);
  } catch (error) {
    console.error("Error in verifyCodeController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
