import prisma from "../lib/prisma.js";

export const foremanRepo = {
  create: async (userData, foremanData) =>
    await prisma.users.create({
      data: {
        ...userData,
        foreman: { create: foremanData },
      },
      include: {
        foreman: true,
      },
    }),
  findById: async (data) =>
    await prisma.foreman.findUnique({ where: { user_id: data } }),
  findByEmail: async (data) =>
    await prisma.foreman.findUnique({ where: { email: data } }),
};
