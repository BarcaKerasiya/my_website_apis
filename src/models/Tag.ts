import mongoose, { Schema, Document } from "mongoose";

export interface Itag extends Document {
  tagName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema: Schema = new Schema({
  tagName: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<Itag>("Tag", tagSchema);
