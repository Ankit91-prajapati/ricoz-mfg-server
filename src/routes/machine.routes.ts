import { Router } from "express";

import {
  createMachine,
  getMachines,
  getMachine,
  updateMachine,
  deleteMachine,
} from "../controllers/web/machine.controller.js";

const router = Router();

router.post("/", createMachine);
router.get("/", getMachines);
router.get("/:id", getMachine);
router.patch("/:id", updateMachine);
router.delete("/:id", deleteMachine);

export default router;