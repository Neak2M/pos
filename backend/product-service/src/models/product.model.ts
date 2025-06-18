import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: String, unique: true, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
