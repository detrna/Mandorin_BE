import { Router } from "express";
import { reviewController } from "../controllers/reviewController.js";
import authenticate from "../middleware/authenticate.js";
import { uploadHelper } from "../middleware/uploadHelper.js";
import { roleGuard } from "../middleware/roleGuard.js";
import { paginate } from "../middleware/paginate.js";

const router = Router();

router.post("/", authenticate, roleGuard("client"), reviewController.create);
router.get("/", paginate(), reviewController.findAll);
router.delete(
  "/:id",
  authenticate,
  roleGuard("client"),
  reviewController.delete,
);

export default router;
