import { Router } from "express";

import {
  createInventory,
  getInventory,
  getInventoryItem,
  updateInventory,
  deleteInventory,
} from "../controllers/web/inventory.controller.js";

const router = Router();

router.post("/", createInventory);
router.get("/", getInventory);
router.get("/:id", getInventoryItem);
router.patch("/:id", updateInventory);
router.delete("/:id", deleteInventory);

export default router;