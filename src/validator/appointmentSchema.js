import JoiBase from "joi";
import joiPhoneNumber from "joi-phone-number";
import { getJoiMessages } from "./joiMessages.js";
const Joi = JoiBase.extend(joiPhoneNumber);

export const appointmentSchema = {
  create: Joi.object({
    location: Joi.string()
      .min(3)
      .max(100)
      .required()
      .label("Lokasi")
      .messages(getJoiMessages()),

    date: Joi.date()
      .iso()
      .required()
      .label("Tanggal")
      .messages(getJoiMessages()),

    time: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .required()
      .label("Waktu")
      .messages(getJoiMessages()),

    note: Joi.string()
      .allow("", null)
      .max(500)
      .label("Catatan")
      .messages(getJoiMessages()),

    clientId: Joi.number().integer().allow(null),
    foremanId: Joi.number().integer().allow(null),
  })
    .or("clientId", "foremanId")
    .messages({
      "object.missing": "Harus mengisi salah satu dari ID Klien atau ID Mandor",
    }),
  update: Joi.object({
    location: Joi.string()
      .min(3)
      .max(100)
      .label("Lokasi")
      .messages(getJoiMessages()),

    date: Joi.date().iso().label("Tanggal").messages(getJoiMessages()),

    time: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .label("Waktu")
      .messages(getJoiMessages()),

    note: Joi.string()
      .allow("", null)
      .max(500)
      .label("Catatan")
      .messages(getJoiMessages()),

    status: Joi.string()
      .valid("PENDING", "DISETUJUI", "DITOLAK", "SELESAI") // Sesuaikan dengan enum Anda
      .label("Status")
      .messages(getJoiMessages()),

    clientId: Joi.number()
      .integer()
      .allow(null)
      .label("ID Klien")
      .messages(getJoiMessages()),

    foremanId: Joi.number()
      .integer()
      .positive()
      .label("ID Mandor")
      .messages(getJoiMessages()),
  })
    .min(1)
    .messages(getJoiMessages()),
};
