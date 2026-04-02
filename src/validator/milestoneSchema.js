import JoiBase from "joi";

const Joi = JoiBase;

const commonMessages = {
  "string.empty": "{#label} tidak boleh kosong",
  "string.min": "{#label} minimal {#limit} karakter",
  "string.max": "{#label} maksimal {#limit} karakter",
  "any.required": "{#label} wajib diisi",
  "date.base": "{#label} harus berupa tanggal yang valid",
  "date.format": "{#label} harus dalam format YYYY-MM-DD",
  "array.min": "Minimal harus ada satu milestone yang dikirim",
  "array.base": "Data harus berupa list (array) dari milestone",
};

export const milestoneSchema = {
  create: Joi.array()
    .items(
      Joi.object({
        title: Joi.string()
          .min(3)
          .max(100)
          .required()
          .label("Judul Milestone")
          .messages(commonMessages),

        content: Joi.string()
          .min(5)
          .required()
          .label("Konten/Deskripsi")
          .messages(commonMessages),

        deadline: Joi.date()
          .iso()
          .required()
          .label("Tenggat Waktu")
          .messages(commonMessages),
      }),
    )
    .min(1) // Memastikan array tidak kosong
    .messages(commonMessages),
};
