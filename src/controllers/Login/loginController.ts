import { IUser } from "./../../types/IUser";
import { Request, Response } from "express";
import { login } from "../../service/Login/loginService";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await login({ password, email } as IUser);
    res.json(result);
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
