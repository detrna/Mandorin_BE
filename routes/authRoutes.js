import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { uploadHelper } from "../middleware/uploadHelper.js";
import { validate } from "../middleware/validate.js";
import { authSchema } from "../validator/authSchema.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.post(
  "/register/clients",
  uploadHelper.single("avatar"),
  validate(authSchema.registerClient),
  authController.registerClient,
);
router.post(
  "/register/foreman",
  uploadHelper.fields(["avatar", "portfolio"]),
  validate(authSchema.registerForeman),
  authController.registerForeman,
);
router.post("/refresh", authenticate, authController.refresh);
router.post("/login", validate(authSchema.login), authController.login);

export default router;
