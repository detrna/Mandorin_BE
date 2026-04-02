import JoiBase from "joi";

const Joi = JoiBase;

const commonMessages = {
  "string.empty": "{#label} tidak boleh kosong",
  "string.min": "{#label} minimal {#limit} karakter",
  "string.max": "{#label} maksimal {#limit} karakter",
  "any.required": "{#label} wajib diisi",
};

export const reportSchema = {
  create: Joi.object({
    title: Joi.string()
      .min(5)
      .max(100)
      .required()
      .label("Judul Laporan")
      .messages(commonMessages),

    content: Joi.string()
      .max(2000)
      .required()
      .label("Isi Laporan")
      .messages(commonMessages),
  }),
};
