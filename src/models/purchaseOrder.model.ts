// models/PurchaseOrder.js
import mongoose from "mongoose";

const purchaseOrderSchema = new mongoose.Schema(
  {
    poNumber: {
      type: String,
      required: true,
      unique: true,
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
      index: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        unitPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    orderDate: {
      type: Date,
      default: Date.now,
    },

    expectedDate: Date,

    status: {
      type: String,
      enum: ["DRAFT", "ORDERED", "PARTIAL", "RECEIVED", "CANCELLED"],
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

export const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);