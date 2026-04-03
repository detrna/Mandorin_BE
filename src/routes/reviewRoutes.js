import { Router } from "express";
import { reviewController } from "../controllers/reviewController.js";
import authenticate from "../middleware/authenticate.js";
import { roleGuard } from "../middleware/roleGuard.js";
import { paginate } from "../middleware/paginate.js";
import { validate } from "../middleware/validate.js";
import { reviewSchema } from "../validator/reviewSchema.js";

const router = Router();

router.post(
  "/",
  authenticate,
  roleGuard("client"),
  validate(reviewSchema.create),
  reviewController.create,
);
router.get("/", paginate(10), reviewController.findAll);
router.delete(
  "/:id",
  authenticate,
  roleGuard("client"),
  reviewController.delete,
);

export default router;
