import JoiBase from "joi";
import { getJoiMessages } from "./joiMessages";

const Joi = JoiBase;

export const reviewSchema = {
  create: Joi.object({
    score: Joi.number()
      .integer()
      .min(1)
      .max(5)
      .required()
      .label("Skor Rating")
      .messages(getJoiMessages()),

    content: Joi.string()
      .min(2)
      .max(500)
      .required()
      .label("Isi Ulasan")
      .messages(getJoiMessages()),

    foremanId: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ID Mandor")
      .messages(getJoiMessages()),
  }),
};
