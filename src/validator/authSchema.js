import JoiBase from "joi";
import joiPhoneNumber from "joi-phone-number";
import { getJoiMessages } from "./joiMessages";

const Joi = JoiBase.extend(joiPhoneNumber);

export const authSchema = {
  registerClient: Joi.object({
    name: Joi.string().min(3).max(50).required().messages(getJoiMessages()),
    nick: Joi.string().min(2).max(20).required().messages(getJoiMessages()),
    birth_place: Joi.string().required().messages(getJoiMessages()),
    birth_date: Joi.date().less("now").required().messages(getJoiMessages()),
    sex: Joi.string()
      .valid("male", "female")
      .required()
      .messages({
        ...getJoiMessages(),
        "any.only": "Jenis kelamin harus male atau female",
      }),
    address: Joi.string().required().messages(getJoiMessages()),
    email: Joi.string().email().required().messages(getJoiMessages()),
    password: Joi.string().min(3).required().messages(getJoiMessages()),
    confirm: Joi.any().equal(Joi.ref("password")).required().messages({
      "any.only": "Konfirmasi password tidak cocok",
      "any.required": "Konfirmasi password wajib diisi",
    }),
    phone: Joi.string()
      .phoneNumber({ defaultCountry: "ID", strict: true })
      .required()
      .messages(getJoiMessages()),
  }),

  registerForeman: Joi.object({
    name: Joi.string().min(3).max(50).required().messages(getJoiMessages()),
    nik: Joi.string()
      .length(16)
      .required()
      .messages({
        ...getJoiMessages(),
        "string.length": "NIK harus tepat 16 karakter",
      }),
    field: Joi.string().required().messages(getJoiMessages()),
    area: Joi.string().required().messages(getJoiMessages()),
    experience: Joi.string().required().messages(getJoiMessages()),
    birth_place: Joi.string().required().messages(getJoiMessages()),
    birth_date: Joi.date().less("now").required().messages(getJoiMessages()),
    sex: Joi.string()
      .valid("male", "female")
      .required()
      .messages(getJoiMessages()),
    address: Joi.string().required().messages(getJoiMessages()),
    email: Joi.string().email().required().messages(getJoiMessages()),
    password: Joi.string().min(8).max(50).required().messages(getJoiMessages()),
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
        ...getJoiMessages(),
        "string.phoneNumber":
          "Nomor telepon tidak valid (Gunakan format Indonesia)",
      }),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages(getJoiMessages()),
    password: Joi.string().required().messages(getJoiMessages()),
  }),
};
