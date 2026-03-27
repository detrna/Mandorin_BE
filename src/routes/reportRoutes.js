import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { reportController } from "../controllers/reportController.js";
import { roleGuard } from "../middleware/roleGuard.js";

const router = Router();

router.get("/:id", authenticate, reportController.find);
router.delete(
  "/:id",
  authenticate,
  roleGuard("foreman"),
  reportController.delete,
);

export default router;
