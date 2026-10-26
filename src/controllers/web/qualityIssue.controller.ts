import { Request, Response } from "express";
import { QualityIssue } from "../../models/qualityIssue.model.js";

export const createQualityIssue = async (
  req: Request,
  res: Response
) => {
  const issue = await QualityIssue.create(req.body);

  res.status(201).json({
    success: true,
    message: "Quality issue created successfully",
    data: issue,
  });
};

export const getQualityIssues = async (
  _req: Request,
  res: Response
) => {
  const issues = await QualityIssue.find()
    .populate("workOrder", "workOrderNumber")
    .populate("product", "name code")
    .populate("inspector", "name email")
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: issues,
  });
};

export const getQualityIssue = async (
  req: Request,
  res: Response
) => {
  const issue = await QualityIssue.findById(
    req.params.id
  )
    .populate("workOrder", "workOrderNumber")
    .populate("product", "name code")
    .populate("inspector", "name email");

  if (!issue) {
    return res.status(404).json({
      success: false,
      message: "Quality issue not found",
    });
  }

  res.json({
    success: true,
    data: issue,
  });
};

export const updateQualityIssue = async (
  req: Request,
  res: Response
) => {
  const issue =
    await QualityIssue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!issue) {
    return res.status(404).json({
      success: false,
      message: "Quality issue not found",
    });
  }

  res.json({
    success: true,
    message: "Quality issue updated successfully",
    data: issue,
  });
};

export const deleteQualityIssue = async (
  req: Request,
  res: Response
) => {
  const issue =
    await QualityIssue.findByIdAndDelete(
      req.params.id
    );

  if (!issue) {
    return res.status(404).json({
      success: false,
      message: "Quality issue not found",
    });
  }

  res.json({
    success: true,
    message: "Quality issue deleted successfully",
  });
};