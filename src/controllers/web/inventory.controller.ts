import { Request, Response } from "express";
import { Inventory } from "../../models/inventory.model.js"

export const createInventory = async (
  req: Request,
  res: Response
) => {
  const inventory = await Inventory.create(req.body);

  res.status(201).json({
    success: true,
    message: "Inventory created successfully",
    data: inventory,
  });
};

export const getInventory = async (
  _req: Request,
  res: Response
) => {
  const inventory = await Inventory.find()
    .populate("product", "name code type unit")
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: inventory,
  });
};

export const getInventoryItem = async (
  req: Request,
  res: Response
) => {
  const inventory = await Inventory.findById(
    req.params.id
  ).populate("product", "name code type unit");

  if (!inventory) {
    return res.status(404).json({
      success: false,
      message: "Inventory item not found",
    });
  }

  res.json({
    success: true,
    data: inventory,
  });
};

export const updateInventory = async (
  req: Request,
  res: Response
) => {
  const inventory =
    await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!inventory) {
    return res.status(404).json({
      success: false,
      message: "Inventory item not found",
    });
  }

  res.json({
    success: true,
    message: "Inventory updated successfully",
    data: inventory,
  });
};

export const deleteInventory = async (
  req: Request,
  res: Response
) => {
  const inventory =
    await Inventory.findByIdAndDelete(
      req.params.id
    );

  if (!inventory) {
    return res.status(404).json({
      success: false,
      message: "Inventory item not found",
    });
  }

  res.json({
    success: true,
    message: "Inventory deleted successfully",
  });
};