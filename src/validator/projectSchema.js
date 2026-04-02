import JoiBase from "joi";
import { getJoiMessages } from "./joiMessages";

const Joi = JoiBase;

export const projectSchema = {
  create: Joi.object({
    proposalId: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ID Proposal")
      .messages(getJoiMessages()),
  }),
};
