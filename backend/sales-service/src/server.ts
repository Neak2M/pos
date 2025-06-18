import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import saleRoutes from "./routes/sale.route";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use("/api/sales", saleRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Sales DB connected");
    app.listen(PORT, () => console.log(`Sales Service running on ${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err));
