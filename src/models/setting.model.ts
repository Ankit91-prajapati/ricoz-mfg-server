import mongoose, { Schema } from "mongoose";

// Single-document collection (key = "organization") holding plant/facility metadata.
const SettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    plantName: { type: String, default: "Ricoz Manufacturing Facility #1", trim: true },
    plantCode: { type: String, default: "MFG-US-EAST", trim: true },
    contactEmail: { type: String, default: "ops@ricoz.mfg", trim: true, lowercase: true },
  },
  { timestamps: true }
);

export const Setting = mongoose.model("Setting", SettingSchema);
