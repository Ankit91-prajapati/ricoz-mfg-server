import { Request, Response } from "express";
import { PurchaseOrder } from "../../models/purchaseOrder.model.js";

export const createPurchaseOrder = async (
  req: Request,
  res: Response
) => {
  const purchaseOrder =
    await PurchaseOrder.create(req.body);

  res.status(201).json({
    success: true,
    message: "Purchase order created successfully",
    data: purchaseOrder,
  });
};

export const getPurchaseOrders = async (
  _req: Request,
  res: Response
) => {
  const purchaseOrders =
    await PurchaseOrder.find()
      .populate("supplier", "name code email phone")
      .populate("items.product", "name code unit")
      .sort({ createdAt: -1 })
      .lean();

  res.json({
    success: true,
    data: purchaseOrders,
  });
};

export const getPurchaseOrder = async (
  req: Request,
  res: Response
) => {
  const purchaseOrder =
    await PurchaseOrder.findById(req.params.id)
      .populate("supplier", "name code email phone")
      .populate("items.product", "name code unit");

  if (!purchaseOrder) {
    return res.status(404).json({
      success: false,
      message: "Purchase order not found",
    });
  }

  res.json({
    success: true,
    data: purchaseOrder,
  });
};

export const updatePurchaseOrder = async (
  req: Request,
  res: Response
) => {
  const purchaseOrder =
    await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!purchaseOrder) {
    return res.status(404).json({
      success: false,
      message: "Purchase order not found",
    });
  }

  res.json({
    success: true,
    message: "Purchase order updated successfully",
    data: purchaseOrder,
  });
};

export const deletePurchaseOrder = async (
  req: Request,
  res: Response
) => {
  const purchaseOrder =
    await PurchaseOrder.findById(req.params.id);

  if (!purchaseOrder) {
    return res.status(404).json({
      success: false,
      message: "Purchase order not found",
    });
  }

  if (
    ["RECEIVED", "PARTIAL"].includes(
      purchaseOrder.status
    )
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Received purchase orders cannot be deleted",
    });
  }

  await purchaseOrder.deleteOne();

  res.json({
    success: true,
    message: "Purchase order deleted successfully",
  });
};