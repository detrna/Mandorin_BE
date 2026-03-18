import prisma from "../lib/prisma.js";

export const userRepo = {
  findByEmail: async (data) =>
    await prisma.users.findUnique({ where: { email: data } }),
  findById: async (data) =>
    await prisma.users.findUnique({ where: { id: data } }),
  delete: async (id) => await prisma.users.delete({ where: { id: id } }),
};
