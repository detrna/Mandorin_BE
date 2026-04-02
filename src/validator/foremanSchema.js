import JoiBase from "joi";
import joiPhoneNumber from "joi-phone-number";
import { getJoiMessages } from "./joiMessages.js";

const Joi = JoiBase.extend(joiPhoneNumber);

export const foremanSchema = {
  update: Joi.object({
    name: Joi.string().min(3).max(100).label("Nama").messages(getJoiMessages()),

    nik: Joi.string()
      .regex(/^[0-9]+$/)
      .length(16)
      .label("NIK")
      .messages({
        ...getJoiMessages(),
        "string.length": "{#label} harus tepat 16 digit",
      }),

    birth_place: Joi.string().label("Tempat Lahir").messages(getJoiMessages()),

    birth_date: Joi.date()
      .iso()
      .label("Tanggal Lahir")
      .messages(getJoiMessages()),

    sex: Joi.string()
      .valid("male", "female")
      .label("Jenis Kelamin")
      .messages(getJoiMessages()),

    address: Joi.string().label("Alamat").messages(getJoiMessages()),

    password: Joi.string().min(8).label("Password").messages(getJoiMessages()),

    confirm: Joi.string()
      .valid(Joi.ref("password"))
      .label("Konfirmasi Password")
      .messages({
        ...getJoiMessages(),
        "any.only": "Konfirmasi password tidak cocok",
      }),

    field: Joi.string().label("Bidang").messages(getJoiMessages()),

    area: Joi.string().label("Area").messages(getJoiMessages()),

    experience: Joi.number()
      .integer()
      .min(0)
      .label("Pengalaman (Tahun)")
      .messages(getJoiMessages()),

    bio: Joi.string().max(2000).label("Biografi").messages(getJoiMessages()),

    strength: Joi.string()
      .label("Keahlian/Kekuatan")
      .messages(getJoiMessages()),

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
  })
    .min(1)
    .with("password", "confirm")
    .messages(getJoiMessages()),
};
