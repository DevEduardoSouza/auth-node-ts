import { register } from "../../service/Register/registerService";
import { IUser } from "./../../types/IUser";
import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { password, email, username } = req.body;
    if (!password || !email || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await register({ password, email, username } as IUser);
    res.json(result);
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
