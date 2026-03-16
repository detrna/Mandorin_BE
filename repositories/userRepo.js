import prisma from "../lib/prisma.js";

export const userRepo = {
  findByEmail: async (data) =>
    await prisma.users.findUnique({ where: { email: data } }),
};
