// models/MaintenanceWorkOrder.js
import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    maintenanceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["PREVENTIVE", "CORRECTIVE", "BREAKDOWN"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },

    status: {
      type: String,
      enum: ["OPEN", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "OPEN",
      index: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    scheduledDate: Date,

    completedAt: Date,

    notes: String,
  },
  { timestamps: true }
);

maintenanceSchema.index({ machine: 1, status: 1 });

 export const MaintenanceWorkOrder = mongoose.model(
  "MaintenanceWorkOrder",
  maintenanceSchema
);