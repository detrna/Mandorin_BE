import { Router } from "express";
import { milestoneController } from "../controllers/milestoneController.js";

const router = Router();

router.get("/:id", milestoneController.find);
router.patch("/", milestoneController.update);

export default router;
