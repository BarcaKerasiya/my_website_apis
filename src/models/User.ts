// src/models/Author.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema: Schema = new Schema({
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", userSchema);