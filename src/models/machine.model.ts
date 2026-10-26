// models/Machine.js
import mongoose from "mongoose";

const machineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    status: {
      type: String,
      enum: [
        "RUNNING",
        "IDLE",
        "STOPPED",
        "MAINTENANCE",
        "BREAKDOWN",
        "OFFLINE",
      ],
      default: "OFFLINE",
      index: true,
    },

    location: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Machine = mongoose.model("Machine", machineSchema);
