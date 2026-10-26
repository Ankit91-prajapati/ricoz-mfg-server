import { Request, Response } from "express";
import { Product } from "../../models/product.model.js";

export const createProduct = async (
  req: Request,
  res: Response
) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

export const getProducts = async (
  _req: Request,
  res: Response
) => {
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: products,
  });
};

export const getProduct = async (
  req: Request,
  res: Response
) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    data: product,
  });
};

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  const product = await Product.findByIdAndDelete(
    req.params.id
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
};