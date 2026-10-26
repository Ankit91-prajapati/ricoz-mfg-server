import { Request, Response } from "express";
import { Machine } from "../../models/machine.model.js";

export const createMachine = async (
  req: Request,
  res: Response
) => {
  const machine = await Machine.create(req.body);

  res.status(201).json({
    success: true,
    message: "Machine created successfully",
    data: machine,
  });
};

export const getMachines = async (
  _req: Request,
  res: Response
) => {
  const machines = await Machine.find()
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: machines,
  });
};

export const getMachine = async (
  req: Request,
  res: Response
) => {
  const machine = await Machine.findById(req.params.id);

  if (!machine) {
    return res.status(404).json({
      success: false,
      message: "Machine not found",
    });
  }

  res.json({
    success: true,
    data: machine,
  });
};

export const updateMachine = async (
  req: Request,
  res: Response
) => {
  const machine = await Machine.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!machine) {
    return res.status(404).json({
      success: false,
      message: "Machine not found",
    });
  }

  res.json({
    success: true,
    message: "Machine updated successfully",
    data: machine,
  });
};

export const deleteMachine = async (
  req: Request,
  res: Response
) => {
  const machine = await Machine.findByIdAndDelete(
    req.params.id
  );

  if (!machine) {
    return res.status(404).json({
      success: false,
      message: "Machine not found",
    });
  }

  res.json({
    success: true,
    message: "Machine deleted successfully",
  });
};