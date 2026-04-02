import JoiBase from "joi";

const Joi = JoiBase;

const commonMessages = {
  "string.empty": "{#label} tidak boleh kosong",
  "string.min": "{#label} minimal {#limit} karakter",
  "string.max": "{#label} maksimal {#limit} karakter",
  "any.required": "{#label} wajib diisi",
  "number.base": "{#label} harus berupa angka",
  "number.integer": "{#label} harus berupa bilangan bulat",
  "number.positive": "{#label} harus berupa angka positif",
  "date.base": "{#label} harus berupa tanggal yang valid",
  "date.format": "{#label} harus dalam format YYYY-MM-DD",
};

export const proposalSchema = {
  create: Joi.object({
    budget: Joi.number()
      .integer()
      .positive()
      .required()
      .label("Anggaran")
      .messages(commonMessages),

    deadline: Joi.date()
      .iso()
      .required()
      .label("Tenggat Waktu")
      .messages(commonMessages),

    field: Joi.string()
      .min(3)
      .max(100)
      .required()
      .label("Bidang Kerja")
      .messages(commonMessages),

    location: Joi.string()
      .min(3)
      .max(100)
      .required()
      .label("Lokasi")
      .messages(commonMessages),

    title: Joi.string()
      .max(150)
      .required()
      .label("Judul")
      .messages(commonMessages),

    content: Joi.string().required().label("Konten").messages(commonMessages),

    clientId: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ID Klien")
      .messages(commonMessages),
  }),
  update: Joi.object({
    title: Joi.string().min(5).max(150).label("Judul").messages(commonMessages),

    content: Joi.string().min(10).label("Konten").messages(commonMessages),

    field: Joi.string()
      .min(3)
      .max(100)
      .label("Bidang Kerja")
      .messages(commonMessages),

    budget: Joi.number()
      .integer()
      .positive()
      .label("Anggaran")
      .messages(commonMessages),

    status: Joi.string()
      .valid("MENUNGGU PERSETUJUAN", "DISETUJUI", "DITOLAK", "SELESAI")
      .label("Status")
      .messages(commonMessages),

    deadline: Joi.date().iso().label("Tenggat Waktu").messages(commonMessages),

    clientId: Joi.number()
      .integer()
      .positive()
      .label("ID Klien")
      .messages(commonMessages),
  })
    .min(1)
    .messages(commonMessages),
};
