// models/Supplier.js
import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
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

    email: String,

    phone: String,

    address: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

 export const Supplier = mongoose.model("Supplier", supplierSchema);