import { Router } from "express";
import { createSale } from "../controllers/sale.controller";

const router = Router();

router.post("/create", createSale);

export default router;
