import JoiBase from "joi";

const Joi = JoiBase;

const commonMessages = {
  "number.base": "{#label} harus berupa angka",
  "number.integer": "{#label} harus berupa bilangan bulat",
  "number.positive": "{#label} tidak valid",
  "any.required": "{#label} wajib diisi",
};

export const projectSchema = {
  create: Joi.object({
    proposalId: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ID Proposal")
      .messages(commonMessages),
  }),
};
