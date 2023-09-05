import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  authorIds: string[];
  tagIds: string[];
  minutesToRead: number;
}

const blogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  authorIds: [{ type: Schema.Types.ObjectId, ref: "Author" }],
  tagIds: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  minutesToRead: { type: Number, required: true },
});

export default mongoose.model<IBlog>("Blog", blogSchema);
