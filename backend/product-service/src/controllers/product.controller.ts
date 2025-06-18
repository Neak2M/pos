import { Request, Response } from "express";
import { Product } from "../models/product.model";

// Create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Error creating product", error: err });
  }
};

// Get all products
export const getAllProducts = async (_: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

// Get single product
export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  product
    ? res.json(product)
    : res.status(404).json({ message: "Product not found" });
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  updated
    ? res.json(updated)
    : res.status(404).json({ message: "Product not found" });
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  deleted
    ? res.json({ message: "Deleted", product: deleted })
    : res.status(404).json({ message: "Product not found" });
};
