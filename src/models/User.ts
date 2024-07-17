import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/IUser";

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager"],
    default: "user",
  },
  password: { type: String, required: true, minlength: 8, maxlength: 128 },
  email: { type: String, required: true, unique: true },
  verificationCode: { type: String },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
