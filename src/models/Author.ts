// src/models/Author.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  status: string;
  jobTitle: string;
  IPAddress: string;
  createdAt: Date;
}

const authorSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  jobTitle: { type: String, required: true },
  IPAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAuthor>("Author", authorSchema);
