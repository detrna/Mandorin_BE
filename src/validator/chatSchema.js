import JoiBase from "joi";
import { getCommonMessages } from "../helpers/joiMessages.js";

const Joi = JoiBase;

export const chatSchema = {
  create: Joi.object({
    content: Joi.string()
      .min(1)
      .max(5000)
      .required()
      .label("Isi Pesan")
      .messages(getCommonMessages()),

    receiverId: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ID Penerima")
      .messages(getCommonMessages()),
  }),
  read: Joi.object({
    senderId: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ID Pengirim")
      .messages(getCommonMessages()),
  }),
};
