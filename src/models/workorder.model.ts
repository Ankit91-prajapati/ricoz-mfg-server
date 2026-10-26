// models/WorkOrder.js
import mongoose from "mongoose";

const workOrderSchema = new mongoose.Schema(
  {
    workOrderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    productionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionPlan",
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    plannedQuantity: {
      type: Number,
      required: true,
      min: 1,
    },

    producedQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    rejectedQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
        
    stockPostedQuantity: { type: Number, default: 0, min: 0 },

    startDate: Date,
    dueDate: Date,

    priority: {
      type: String,
      enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
      default: "NORMAL",
    },

    status: {
      type: String,
      enum: [
        "CREATED",
        "RELEASED",
        "IN_PROGRESS",
        "PAUSED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "CREATED",
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

workOrderSchema.index({ status: 1, dueDate: 1 });

export const WorkOrder = mongoose.model("WorkOrder", workOrderSchema);  