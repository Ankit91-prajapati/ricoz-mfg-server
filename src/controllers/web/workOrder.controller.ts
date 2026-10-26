import { Request, Response } from "express";
import { WorkOrder } from "../../models/workorder.model.js";

export const createWorkOrder = async (
  req: Request,
  res: Response
) => {
  const workOrder = await WorkOrder.create(req.body);

  res.status(201).json({
    success: true,
    message: "Work order created successfully",
    data: workOrder,
  });
};

export const getWorkOrders = async (
  _req: Request,
  res: Response
) => {
  const workOrders = await WorkOrder.find()
    .populate("product", "name code")
    .populate("productionPlan", "planNumber")
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: workOrders,
  });
};

export const getWorkOrder = async (
  req: Request,
  res: Response
) => {
  const workOrder = await WorkOrder.findById(
    req.params.id
  )
    .populate("product", "name code")
    .populate("productionPlan", "planNumber");

  if (!workOrder) {
    return res.status(404).json({
      success: false,
      message: "Work order not found",
    });
  }

  res.json({
    success: true,
    data: workOrder,
  });
};

export const updateWorkOrder = async (
  req: Request,
  res: Response
) => {
  const workOrder =
    await WorkOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!workOrder) {
    return res.status(404).json({
      success: false,
      message: "Work order not found",
    });
  }

  res.json({
    success: true,
    message: "Work order updated successfully",
    data: workOrder,
  });
};

export const deleteWorkOrder = async (
  req: Request,
  res: Response
) => {
  const workOrder = await WorkOrder.findById(
    req.params.id
  );

  if (!workOrder) {
    return res.status(404).json({
      success: false,
      message: "Work order not found",
    });
  }

  if (
    ["IN_PROGRESS", "COMPLETED"].includes(
      workOrder.status
    )
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Work order cannot be deleted after production starts",
    });
  }

  await workOrder.deleteOne();

  res.json({
    success: true,
    message: "Work order deleted successfully",
  });
};