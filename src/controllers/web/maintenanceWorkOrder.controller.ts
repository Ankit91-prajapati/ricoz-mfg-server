import { Request, Response } from "express";
import { MaintenanceWorkOrder } from "../../models/maintenenceWorkOrder.model.js";

export const createMaintenanceWorkOrder = async (
  req: Request,
  res: Response
) => {
  const maintenance =
    await MaintenanceWorkOrder.create(req.body);

  res.status(201).json({
    success: true,
    message: "Maintenance work order created successfully",
    data: maintenance,
  });
};

export const getMaintenanceWorkOrders = async (
  _req: Request,
  res: Response
) => {
  const maintenance =
    await MaintenanceWorkOrder.find()
      .populate("machine", "name code status")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .lean();

  res.json({
    success: true,
    data: maintenance,
  });
};

export const getMaintenanceWorkOrder = async (
  req: Request,
  res: Response
) => {
  const maintenance =
    await MaintenanceWorkOrder.findById(
      req.params.id
    )
      .populate("machine", "name code status")
      .populate("assignedTo", "name email");

  if (!maintenance) {
    return res.status(404).json({
      success: false,
      message: "Maintenance work order not found",
    });
  }

  res.json({
    success: true,
    data: maintenance,
  });
};

export const updateMaintenanceWorkOrder = async (
  req: Request,
  res: Response
) => {
  const maintenance =
    await MaintenanceWorkOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!maintenance) {
    return res.status(404).json({
      success: false,
      message: "Maintenance work order not found",
    });
  }

  res.json({
    success: true,
    message: "Maintenance work order updated successfully",
    data: maintenance,
  });
};

export const deleteMaintenanceWorkOrder = async (
  req: Request,
  res: Response
) => {
  const maintenance =
    await MaintenanceWorkOrder.findByIdAndDelete(
      req.params.id
    );

  if (!maintenance) {
    return res.status(404).json({
      success: false,
      message: "Maintenance work order not found",
    });
  }

  res.json({
    success: true,
    message: "Maintenance work order deleted successfully",
  });
};