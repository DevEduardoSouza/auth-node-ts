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
  password: { type: String, required: true, minlength: 8, maxlength: 128 },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
