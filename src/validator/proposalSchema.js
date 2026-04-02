import JoiBase from "joi";
import { getJoiMessages } from "./joiMessages.js";

const Joi = JoiBase;

export const proposalSchema = {
  create: Joi.object({
    budget: Joi.number()
      .integer()
      .positive()
      .required()
      .label("Anggaran")
      .messages(getJoiMessages()),

    deadline: Joi.date()
      .iso()
      .required()
      .label("Tenggat Waktu")
      .messages(getJoiMessages()),

    field: Joi.string()
      .min(3)
      .max(100)
      .required()
      .label("Bidang Kerja")
      .messages(getJoiMessages()),

    location: Joi.string()
      .min(3)
      .max(100)
      .required()
      .label("Lokasi")
      .messages(getJoiMessages()),

    title: Joi.string()
      .max(150)
      .required()
      .label("Judul")
      .messages(getJoiMessages()),

    content: Joi.string().required().label("Konten").messages(getJoiMessages()),

    clientId: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ID Klien")
      .messages(getJoiMessages()),
  }),
  update: Joi.object({
    title: Joi.string()
      .min(5)
      .max(150)
      .label("Judul")
      .messages(getJoiMessages()),

    content: Joi.string().min(10).label("Konten").messages(getJoiMessages()),

    field: Joi.string()
      .min(3)
      .max(100)
      .label("Bidang Kerja")
      .messages(getJoiMessages()),

    budget: Joi.number()
      .integer()
      .positive()
      .label("Anggaran")
      .messages(getJoiMessages()),

    status: Joi.string()
      .valid("MENUNGGU PERSETUJUAN", "DISETUJUI", "DITOLAK", "SELESAI")
      .label("Status")
      .messages(getJoiMessages()),

    deadline: Joi.date()
      .iso()
      .label("Tenggat Waktu")
      .messages(getJoiMessages()),

    clientId: Joi.number()
      .integer()
      .positive()
      .label("ID Klien")
      .messages(getJoiMessages()),
  })
    .min(1)
    .messages(getJoiMessages()),
};
