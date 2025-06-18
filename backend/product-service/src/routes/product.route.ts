import { Router } from "express";
import { Product } from "../models/product.model";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.post("/validate", async (req, res) => {
  try {
    const { productIds } = req.body;

    const products = await Product.find({ _id: { $in: productIds } });

    res.json(products.map(p => ({
      _id: p._id,
      name: p.name,
      price: p.price
    })));
  } catch (err) {
    res.status(500).json({ message: "Validation failed", error: err});
  }
});


export default router;
