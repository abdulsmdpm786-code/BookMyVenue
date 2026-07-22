import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  adminId: { type: String },
  userId: { type: String },
  orgId: { type: String },
  title: { type: String },
  description: { type: String, required: true },
});

export const messageModel = mongoose.model("message", messageSchema);
