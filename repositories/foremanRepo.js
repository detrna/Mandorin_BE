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
  findById: async (id) =>
    await prisma.foreman.findUnique({
      where: { user_id: id },
      include: { users: { omit: { password: true } } },
    }),
  findAll: async () =>
    await prisma.foreman.findMany({
      omit: { user_id: true },
      include: { users: { omit: { password: true } } },
    }),
  findByEmail: async (data) =>
    await prisma.foreman.findUnique({ where: { email: data } }),
  updateData: async (userData, foremanData, id) => {
    return await prisma.users.update({
      where: { id: id },
      data: {
        ...userData,
        foreman: {
          upsert: {
            create: { ...foremanData },
            update: { ...foremanData },
          },
        },
      },
      include: { foreman: true },
    });
  },
};
