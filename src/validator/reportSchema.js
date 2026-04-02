import JoiBase from "joi";
import { getJoiMessages } from "./joiMessages";

const Joi = JoiBase;

export const reportSchema = {
  create: Joi.object({
    title: Joi.string()
      .min(5)
      .max(100)
      .required()
      .label("Judul Laporan")
      .messages(getJoiMessages()),

    content: Joi.string()
      .max(2000)
      .required()
      .label("Isi Laporan")
      .messages(getJoiMessages()),
  }),
};
