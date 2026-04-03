import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController.js";
import authenticate from "../middleware/authenticate.js";
import { paginate } from "../middleware/paginate.js";
import { validate } from "../middleware/validate.js";
import { appointmentSchema } from "../validator/appointmentSchema.js";

const router = Router();

router.get("/", authenticate, paginate(15), appointmentController.findAll);
router.get("/:id", authenticate, appointmentController.find);
router.post(
  "/",
  authenticate,
  validate(appointmentSchema.create),
  appointmentController.create,
);
router.patch(
  "/:id",
  authenticate,
  validate(appointmentSchema.update),
  appointmentController.update,
);
router.delete("/:id", authenticate, appointmentController.delete);

export default router;
