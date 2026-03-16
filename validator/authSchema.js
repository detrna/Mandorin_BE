import Joi from "joi";

export const authSchema = {
  registerClient: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    nick: Joi.string().min(2).max(20).required(),
    birth_place: Joi.string().required(),
    birth_date: Joi.date().less("now").required(),
    sex: Joi.string().valid("male", "female").required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    confirm: Joi.any().equal(Joi.ref("password")).required(),
  }),
  registerForeman: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    nik: Joi.string().min(16).max(16).required(),
    field: Joi.string().required(),
    area: Joi.string().required(),
    experience: Joi.string().required(),
    birth_place: Joi.string().required(),
    birth_date: Joi.date().less("now").required(),
    sex: Joi.string().valid("male", "female").required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
    confirm: Joi.any().equal(Joi.ref("password")).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
