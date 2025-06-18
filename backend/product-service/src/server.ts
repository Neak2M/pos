import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/products", productRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Product DB connected");
    app.listen(PORT, () => console.log(`Product Service running on ${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err));
