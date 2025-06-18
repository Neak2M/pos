import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    customerId: { type: String },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash", "card", "qr"], required: true }
  },
  { timestamps: true }
);

export const Sale = mongoose.model("Sale", SaleSchema);
