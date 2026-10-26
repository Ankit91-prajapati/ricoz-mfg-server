import { Request, Response } from "express";
import { OperationExecution } from "../../models/operationExecution.model.js";

export const createOperationExecution = async (
  req: Request,
  res: Response
) => {
  const execution =
    await OperationExecution.create(req.body);

  res.status(201).json({
    success: true,
    message: "Operation execution created successfully",
    data: execution,
  });
};

export const getOperationExecutions = async (
  req: Request,
  res: Response
) => {
  const filter: Record<string, unknown> = {};

  if (req.query.workOrder) {
    filter.workOrder = req.query.workOrder;
  }

  if (req.query.machine) {
    filter.machine = req.query.machine;
  }

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const executions =
    await OperationExecution.find(filter)
      .populate("workOrder", "workOrderNumber")
      .populate("machine", "name code status")
      .populate("operator", "name email")
      .sort({ createdAt: -1 })
      .lean();

  res.json({
    success: true,
    data: executions,
  });
};

export const getOperationExecution = async (
  req: Request,
  res: Response
) => {
  const execution =
    await OperationExecution.findById(
      req.params.id
    )
      .populate("workOrder", "workOrderNumber")
      .populate("machine", "name code status")
      .populate("operator", "name email");

  if (!execution) {
    return res.status(404).json({
      success: false,
      message: "Operation execution not found",
    });
  }

  res.json({
    success: true,
    data: execution,
  });
};

export const updateOperationExecution = async (
  req: Request,
  res: Response
) => {
  const execution =
    await OperationExecution.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!execution) {
    return res.status(404).json({
      success: false,
      message: "Operation execution not found",
    });
  }

  res.json({
    success: true,
    message: "Operation execution updated successfully",
    data: execution,
  });
};