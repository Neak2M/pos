import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/product.model";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/product-db";

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await Product.deleteMany(); // Optional: clear existing data

    await Product.insertMany([
      {
        name: "Coca-Cola",
        price: 1.25,
        sku: "COKE001",
        stock: 50,
        category: "Beverage",
        description: "Classic Coca-Cola soft drink"
      },
      {
        name: "Pepsi",
        price: 1.20,
        sku: "PEPSI001",
        stock: 40,
        category: "Beverage",
        description: "Popular cola-flavored soft drink"
      },
      {
        name: "Lay's Classic",
        price: 1.50,
        sku: "LAYS001",
        stock: 30,
        category: "Snack",
        description: "Potato chips, original flavor"
      },
      {
        name: "M&M's Chocolate",
        price: 2.00,
        sku: "MMS001",
        stock: 25,
        category: "Candy",
        description: "Milk chocolate candies with shell"
      },
      {
        name: "Nestlé Water",
        price: 0.85,
        sku: "WATER001",
        stock: 100,
        category: "Beverage",
        description: "Purified bottled water"
      }
    ]);

    console.log("✅ Products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
