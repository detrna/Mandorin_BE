import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { uploadHelper } from "../middleware/uploadHelper.js";
import { validate } from "../middleware/validate.js";
import { chatSchema } from "../validator/chatSchema.js";
import { chatController } from "../controllers/chatController.js";
import { paginate } from "../middleware/paginate.js";

const router = Router();

router.post(
  "/",
  authenticate,
  uploadHelper.single("image"),
  validate(chatSchema.create),
  chatController.sendMessage,
);

router.get("/", authenticate, paginate(), chatController.getAllLastReceived);
router.get("/received", authenticate, paginate(), chatController.getReceived);
router.patch("/read", authenticate, chatController.read);
router.delete("/:id", authenticate, chatController.delete);

export default router;
