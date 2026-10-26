// models/ProductionPlan.js
import mongoose from "mongoose";

const productionPlanSchema = new mongoose.Schema(
  {
    planNumber: {
      type: String,
      required: true,
      unique: true,
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

    startDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    priority: {
      type: String,
      enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
      default: "NORMAL",
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "PLANNED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "DRAFT",
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

 export const ProductionPlan = mongoose.model("ProductionPlan", productionPlanSchema);