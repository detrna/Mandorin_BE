import JoiBase from "joi";
import joiPhoneNumber from "joi-phone-number";
import { getCommonMessages } from "./joiMessages";

const Joi = JoiBase.extend(joiPhoneNumber);

export const foremanSchema = {
  update: Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .label("Nama")
      .messages(getCommonMessages()),

    nik: Joi.string()
      .regex(/^[0-9]+$/)
      .length(16)
      .label("NIK")
      .messages({
        ...getCommonMessages(),
        "string.length": "{#label} harus tepat 16 digit",
      }),

    birth_place: Joi.string()
      .label("Tempat Lahir")
      .messages(getCommonMessages()),

    birth_date: Joi.date()
      .iso()
      .label("Tanggal Lahir")
      .messages(getCommonMessages()),

    sex: Joi.string()
      .valid("male", "female")
      .label("Jenis Kelamin")
      .messages(getCommonMessages()),

    address: Joi.string().label("Alamat").messages(getCommonMessages()),

    password: Joi.string()
      .min(8)
      .label("Password")
      .messages(getCommonMessages()),

    confirm: Joi.string()
      .valid(Joi.ref("password"))
      .label("Konfirmasi Password")
      .messages({
        ...getCommonMessages(),
        "any.only": "Konfirmasi password tidak cocok",
      }),

    field: Joi.string().label("Bidang").messages(getCommonMessages()),

    area: Joi.string().label("Area").messages(getCommonMessages()),

    experience: Joi.number()
      .integer()
      .min(0)
      .label("Pengalaman (Tahun)")
      .messages(getCommonMessages()),

    bio: Joi.string().max(2000).label("Biografi").messages(getCommonMessages()),

    strength: Joi.string()
      .label("Keahlian/Kekuatan")
      .messages(getCommonMessages()),

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
    .messages(getCommonMessages()),
};
