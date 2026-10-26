// models/QualityIssue.js
import mongoose from "mongoose";

const qualityIssueSchema = new mongoose.Schema(
  {
    issueNumber: {
      type: String,
      required: true,
      unique: true,
    },

    workOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkOrder",
      required: true,
      index: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    type: {
      type: String,
      enum: ["INSPECTION", "NON_CONFORMANCE"],
      required: true,
    },

    quantityInspected: {
      type: Number,
      default: 0,
    },

    quantityPassed: {
      type: Number,
      default: 0,
    },

    quantityFailed: {
      type: Number,
      default: 0,
    },

    defectType: String,

    description: String,

    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },

    status: {
      type: String,
      enum: ["OPEN", "UNDER_REVIEW", "PASSED", "FAILED", "CLOSED"],
      default: "OPEN",
      index: true,
    },

    inspector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    correctiveAction: String,

    closedAt: Date,
  },
  { timestamps: true }
);

export  const QualityIssue = mongoose.model("QualityIssue", qualityIssueSchema);