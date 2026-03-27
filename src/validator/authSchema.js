import JoiBase from "joi";
import joiPhoneNumber from "joi-phone-number";

const Joi = JoiBase.extend(joiPhoneNumber);

// Common error messages to avoid repetition
const commonMessages = {
  "string.empty": "{#label} tidak boleh kosong",
  "string.min": "{#label} minimal {#limit} karakter",
  "string.max": "{#label} maksimal {#limit} karakter",
  "string.email": "Format email tidak valid",
  "any.required": "{#label} wajib diisi",
  "any.only": "{#label} tidak cocok atau tidak valid",
  "date.base": "{#label} harus berupa tanggal yang valid",
  "date.less": "{#label} tidak boleh di masa depan",
  "string.phoneNumber": "Nomor telepon tidak valid",
};

export const authSchema = {
  registerClient: Joi.object({
    name: Joi.string().min(3).max(50).required().messages(commonMessages),
    nick: Joi.string().min(2).max(20).required().messages(commonMessages),
    birth_place: Joi.string().required().messages(commonMessages),
    birth_date: Joi.date().less("now").required().messages(commonMessages),
    sex: Joi.string()
      .valid("male", "female")
      .required()
      .messages({
        ...commonMessages,
        "any.only": "Jenis kelamin harus male atau female",
      }),
    address: Joi.string().required().messages(commonMessages),
    email: Joi.string().email().required().messages(commonMessages),
    password: Joi.string().min(3).required().messages(commonMessages),
    confirm: Joi.any().equal(Joi.ref("password")).required().messages({
      "any.only": "Konfirmasi password tidak cocok",
      "any.required": "Konfirmasi password wajib diisi",
    }),
    phone: Joi.string()
      .phoneNumber({ defaultCountry: "ID", strict: true })
      .required()
      .messages(commonMessages),
  }),

  registerForeman: Joi.object({
    name: Joi.string().min(3).max(50).required().messages(commonMessages),
    nik: Joi.string()
      .length(16)
      .required()
      .messages({
        ...commonMessages,
        "string.length": "NIK harus tepat 16 karakter",
      }),
    field: Joi.string().required().messages(commonMessages),
    area: Joi.string().required().messages(commonMessages),
    experience: Joi.string().required().messages(commonMessages),
    birth_place: Joi.string().required().messages(commonMessages),
    birth_date: Joi.date().less("now").required().messages(commonMessages),
    sex: Joi.string()
      .valid("male", "female")
      .required()
      .messages(commonMessages),
    address: Joi.string().required().messages(commonMessages),
    email: Joi.string().email().required().messages(commonMessages),
    password: Joi.string().min(8).max(50).required().messages(commonMessages),
    confirm: Joi.any().equal(Joi.ref("password")).required().messages({
      "any.only": "Konfirmasi password tidak cocok",
    }),
    phone: Joi.string()
      .phoneNumber({
        defaultCountry: "ID",
        format: "international",
        strict: true,
      })
      .required()
      .messages({
        ...commonMessages,
        "string.phoneNumber":
          "Nomor telepon tidak valid (Gunakan format Indonesia)",
      }),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages(commonMessages),
    password: Joi.string().required().messages(commonMessages),
  }),
};
