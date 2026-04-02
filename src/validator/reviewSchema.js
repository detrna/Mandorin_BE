import JoiBase from "joi";

const Joi = JoiBase;

const commonMessages = {
  "string.empty": "{#label} tidak boleh kosong",
  "string.min": "{#label} minimal {#limit} karakter",
  "string.max": "{#label} maksimal {#limit} karakter",
  "number.base": "{#label} harus berupa angka",
  "number.min": "{#label} minimal {#limit}",
  "number.max": "{#label} maksimal {#limit}",
  "any.required": "{#label} wajib diisi",
};

export const reviewSchema = {
  create: Joi.object({
    score: Joi.number()
      .integer()
      .min(1)
      .max(5)
      .required()
      .label("Skor Rating")
      .messages(commonMessages),

    content: Joi.string()
      .min(2)
      .max(500)
      .required()
      .label("Isi Ulasan")
      .messages(commonMessages),

    foremanId: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ID Mandor")
      .messages(commonMessages),
  }),
};
