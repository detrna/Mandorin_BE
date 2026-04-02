import { Router } from "express";
import chatController from "../controllers/chatController.js";
import authenticate from "../middleware/authenticate.js";
import { uploadHelper } from "../middleware/uploadHelper.js";
import { validate } from "../middleware/validate.js";
import { chatSchema } from "../validator/chatSchema.js";

const router = Router;

router.post(
  "/",
  authenticate,
  uploadHelper("image"),
  validate(chatSchema.create),
  chatController.sendMessage,
);

router.get("/", authenticate, chatController.getAllLastReceived);
router.get("/received", authenticate, chatController.getReceived);
router.patch(
  "/read",
  authenticate,
  validate(chatSchema.read),
  chatController.read,
);
router.delete("/:id", authenticate, chatController.delete);

export default router;
