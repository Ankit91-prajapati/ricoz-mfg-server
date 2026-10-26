import mongoose, { Schema } from "mongoose";

// Credentials (password, reset tokens, sessions) now live in Clerk.
// This collection only keeps the app-level profile + role, linked by clerkId.
const UserSchema = new Schema(
  {
    clerkId: { type: String, unique: true, sparse: true, index: true },
    username: { type: String },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isemailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
