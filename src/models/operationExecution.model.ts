// models/OperationExecution.js
import mongoose from "mongoose";

const operationExecutionSchema = new mongoose.Schema(
  {
    workOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkOrder",
      required: true,
      index: true,
    },

    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      index: true,
    },

    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    operationName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["NOT_STARTED", "RUNNING", "PAUSED", "COMPLETED"],
      default: "NOT_STARTED",
      index: true,
    },

    plannedQuantity: {
      type: Number,
      default: 0,
    },

    goodQuantity: {
      type: Number,
      default: 0,
    },

    rejectedQuantity: {
      type: Number,
      default: 0,
    },

    startedAt: Date,
    completedAt: Date,

    notes: String,
  },
  { timestamps: true }
);

operationExecutionSchema.index({ machine: 1, status: 1 });

 export const OperationExecution = mongoose.model(
  "OperationExecution",
  operationExecutionSchema
);