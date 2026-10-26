import { Request, Response } from "express";
import { Supplier } from "../../models/supplier.model.js";

export const createSupplier = async (
  req: Request,
  res: Response
) => {
  const supplier = await Supplier.create(req.body);

  res.status(201).json({
    success: true,
    message: "Supplier created successfully",
    data: supplier,
  });
};

export const getSuppliers = async (
  _req: Request,
  res: Response
) => {
  const suppliers = await Supplier.find()
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: suppliers,
  });
};

export const getSupplier = async (
  req: Request,
  res: Response
) => {
  const supplier = await Supplier.findById(
    req.params.id
  );

  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: "Supplier not found",
    });
  }

  res.json({
    success: true,
    data: supplier,
  });
};

export const updateSupplier = async (
  req: Request,
  res: Response
) => {
  const supplier =
    await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: "Supplier not found",
    });
  }

  res.json({
    success: true,
    message: "Supplier updated successfully",
    data: supplier,
  });
};

export const deleteSupplier = async (
  req: Request,
  res: Response
) => {
  const supplier =
    await Supplier.findByIdAndDelete(
      req.params.id
    );

  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: "Supplier not found",
    });
  }

  res.json({
    success: true,
    message: "Supplier deleted successfully",
  });
};