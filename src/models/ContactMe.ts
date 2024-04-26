// src/models/Author.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  IPAddress: string;
  createdAt: Date;
}

const contactMeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  IPAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IContact>("ContactMe", contactMeSchema);
