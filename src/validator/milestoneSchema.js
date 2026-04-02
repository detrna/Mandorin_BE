import JoiBase from "joi";
import { getJoiMessages } from "./joiMessages";

const Joi = JoiBase;

export const milestoneSchema = {
  create: Joi.array()
    .items(
      Joi.object({
        title: Joi.string()
          .min(3)
          .max(100)
          .required()
          .label("Judul Milestone")
          .messages(getJoiMessages()),

        content: Joi.string()
          .min(5)
          .required()
          .label("Konten/Deskripsi")
          .messages(getJoiMessages()),

        deadline: Joi.date()
          .iso()
          .required()
          .label("Tenggat Waktu")
          .messages(getJoiMessages()),
      }),
    )
    .min(1) // Memastikan array tidak kosong
    .messages(getJoiMessages()),
};
