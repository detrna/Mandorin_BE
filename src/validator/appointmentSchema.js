import JoiBase from "joi";
import joiPhoneNumber from "joi-phone-number";
const Joi = JoiBase.extend(joiPhoneNumber);

const commonMessages = {
  "string.empty": "{#label} tidak boleh kosong",
  "string.min": "{#label} minimal {#limit} karakter",
  "string.max": "{#label} maksimal {#limit} karakter",
  "string.email": "Format email tidak valid",
  "any.required": "{#label} wajib diisi",
  "any.only": "{#label} tidak cocok atau tidak valid",
  "date.base": "{#label} harus berupa tanggal yang valid",
  "date.less": "{#label} tidak boleh di masa depan",
  "date.format": "{#label} harus dalam format YYYY-MM-DD",
  "string.phoneNumber": "Nomor telepon tidak valid",
  "number.base": "{#label} harus berupa angka",
  "number.integer": "{#label} harus berupa bilangan bulat",
  "string.pattern.base": "Format {#label} tidak valid (gunakan HH:mm)",
};

export const appointmentSchema = {
  create: Joi.object({
    location: Joi.string()
      .min(3)
      .max(100)
      .required()
      .label("Lokasi")
      .messages(commonMessages),

    date: Joi.date().iso().required().label("Tanggal").messages(commonMessages),

    time: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .required()
      .label("Waktu")
      .messages(commonMessages),

    note: Joi.string()
      .allow("", null)
      .max(500)
      .label("Catatan")
      .messages(commonMessages),

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
      .messages(commonMessages),

    date: Joi.date().iso().label("Tanggal").messages(commonMessages),

    time: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .label("Waktu")
      .messages(commonMessages),

    note: Joi.string()
      .allow("", null)
      .max(500)
      .label("Catatan")
      .messages(commonMessages),

    status: Joi.string()
      .valid("PENDING", "DISETUJUI", "DITOLAK", "SELESAI") // Sesuaikan dengan enum Anda
      .label("Status")
      .messages(commonMessages),

    clientId: Joi.number()
      .integer()
      .allow(null)
      .label("ID Klien")
      .messages(commonMessages),

    foremanId: Joi.number()
      .integer()
      .positive()
      .label("ID Mandor")
      .messages(commonMessages),
  })
    .min(1)
    .messages(commonMessages),
};
