import { Router } from "express";
import { milestoneController } from "../controllers/milestoneController.js";
import authenticate from "../middleware/authenticate.js";
import { roleGuard } from "../middleware/roleGuard.js";

const router = Router();

router.get("/:id", authenticate, milestoneController.find);
router.patch(
  "/",
  authenticate,
  roleGuard("foreman"),
  milestoneController.update,
);

export default router;
