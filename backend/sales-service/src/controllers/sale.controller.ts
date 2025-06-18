import { Request, Response } from "express";
import { Sale } from "../models/sale.model";
import axios from "axios";

export const createSale = async (req: Request, res: Response) => {
  try {
    const { customerId, items, paymentMethod } = req.body;

    // Step 1: Validate & fetch product details from product-service
    const productIds = items.map((item: any) => item.productId);
    const productServiceURL = "http://localhost:5001/api/products/validate";

    const productResponse = await axios.post(productServiceURL, { productIds });

    const productData = productResponse.data; // [{ _id, price }, ...]

    // Step 2: Match and calculate total
    let total = 0;
    const enrichedItems = items.map((item: any) => {
      const product = productData.find((p: any) => p._id === item.productId);
      if (!product) throw new Error("Invalid product ID");
      const subtotal = product.price * item.quantity;
      total += subtotal;
      return { ...item, price: product.price };
    });

    // Step 3: Save sale to DB
    const sale = await Sale.create({
      customerId,
      items: enrichedItems,
      total,
      paymentMethod
    });

    res.status(201).json({
      message: "Sale completed",
      saleId: sale._id,
      total: sale.total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create sale", error: error });
  }
};
