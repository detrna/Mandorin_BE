import { Router } from "express";
import { reviewController } from "../controllers/reviewController.js";
import authenticate from "../middleware/authenticate.js";
import { uploadHelper } from "../middleware/uploadHelper.js";
import { roleGuard } from "../middleware/roleGuard.js";

const router = Router();

router.post(
  "/",
  authenticate,
  roleGuard("client"),
  uploadHelper.single("photo"),
  reviewController.create,
);
// router.get("/");
// router.get("/:uid");

export default router;
