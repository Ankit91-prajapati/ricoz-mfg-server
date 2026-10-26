import { Router } from "express";

import {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from "../controllers/web/purchaseOrder.controller.js";

const router = Router();

router.post("/", createPurchaseOrder);
router.get("/", getPurchaseOrders);
router.get("/:id", getPurchaseOrder);
router.patch("/:id", updatePurchaseOrder);
router.delete("/:id", deletePurchaseOrder);

export default router;