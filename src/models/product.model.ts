// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
      trim: true,
    },

    type: {
      type: String,
      enum: ["RAW_MATERIAL", "COMPONENT", "FINISHED_GOOD"],
      required: true,
    },

    unit: {
      type: String,
      default: "PCS",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

 export const Product= mongoose.model("Product", productSchema);