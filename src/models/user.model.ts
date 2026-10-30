import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true },
    username: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isemailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("User", userSchema);