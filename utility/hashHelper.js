import bcrypt from "bcrypt";

export const hashHelper = {
  hash: async (data) => await bcrypt.hash(data, Number(process.env.SALT)),
  compare: async (data, compared) => await bcrypt.compare(data, compared),
};
