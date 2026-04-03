import JoiBase from "joi";
import { getJoiMessages } from "./joiMessages.js";

const Joi = JoiBase;

export const chatSchema = {
  create: Joi.object({
    content: Joi.string()
      .min(1)
      .max(5000)
      .required()
      .label("Isi Pesan")
      .messages(getJoiMessages()),

    receiverId: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ID Penerima")
      .messages(getJoiMessages()),
  }),
};
